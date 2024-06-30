import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Quizzz</h1>
      <nav>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {isAuthenticated ? (
          <>
            <span className="mr-4">Cześć, {user.username}!</span>
            <button onClick={logout} className="mr-4">
              Wyloguj
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Zaloguj
            </Link>
            <Link to="/register" className="bg-blue-500 px-4 py-2 rounded">
              Rejestracja
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
