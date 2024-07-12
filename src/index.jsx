import React from "react";
import ReactDOM from "react-dom/client"; // poprawiony import
import { BrowserRouter } from "react-router-dom"; // upewnij się, że import jest tylko tutaj
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
