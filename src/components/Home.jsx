import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { quizzes } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
            <p className="mb-2">Created by: {quiz.author}</p>
            <Link
              to={`/quiz/${quiz.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Take Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
