import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-5">Welcome to the Quiz App</h1>
      {user ? (
        <>
          <p className="mb-5">
            Welcome, {user.username}! You can create your own quizzes or check
            out existing ones.
          </p>
          <Link
            to="/create-quiz"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Create Quiz
          </Link>
          <Link
            to="/user-quizzes"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Your Quizzes
          </Link>
        </>
      ) : (
        <>
          <p className="mb-5">You need to log in to create your own quizzes.</p>
          <Link
            to="/quizzes"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Browse Quizzes
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
