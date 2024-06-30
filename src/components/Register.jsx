import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (username.length > 10) {
      setError("Nazwa użytkownika nie może być dłuższa niż 10 znaków.");
      return false;
    }
    if (
      password.length < 4 ||
      !/\d/.test(password) ||
      !/[A-Za-z]/.test(password)
    ) {
      setError(
        "Hasło musi się składać przynajmniej z 4 znaków i zawierać cyfrę oraz literę."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const existingUser = await axios.get("http://localhost:3000/users", {
        params: { username },
      });

      if (existingUser.data.length > 0) {
        setError("Nazwa użytkownika jest już zajęta.");
        return;
      }

      await axios.post("http://localhost:3000/users", { username, password });
      alert("Rejestracja przebiegła pomyślnie");
      navigate("/login");
    } catch (error) {
      setError("Rejestracja nie powiodła się");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rejestracja</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Nazwa użytkownika</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Zarejestruj
        </button>
      </form>
    </div>
  );
};

export default Register;
