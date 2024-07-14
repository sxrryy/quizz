import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
        navigate("/");
      } else {
        setLoginError("Nieprawidłowy email lub hasło");
      }
    } catch (error) {
      console.error("Błąd logowania", error);
      setLoginError("Wystąpił błąd podczas logowania. Proszę spróbuj ponownie");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Logowanie</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Email:</label>
          <input
            {...register("email", { required: "Email jest wymagany" })}
            className="border p-2 w-full"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label>Hasło:</label>
          <input
            type="password"
            {...register("password", { required: "Hasło jest wymagane" })}
            className="border p-2 w-full"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
        <button type="submit" className="bg-blue-500 text-white p-2">
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Login;
