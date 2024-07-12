import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const register = async (username, password) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
