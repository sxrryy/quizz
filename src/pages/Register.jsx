import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => navigate("/login"));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Rejestracja</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email jest wymagany.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Nieprawidłowy format emaila.",
              },
            })}
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
            {...register("password", {
              required: "Hasło wymagane",
              minLength: {
                value: 6,
                message: "Hasło musi się składać minimum z 6 znaków.",
              },
            })}
            className="border p-2 w-full"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Zarejestruj
        </button>
      </form>
    </div>
  );
};

export default Register;
