import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const UserQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/quizzes?userId=${user.id}`
        );
        setQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      }
    };

    fetchUserQuizzes();
  }, [user.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-2">
            <Link to={`/quiz/${quiz.id}`} className="text-blue-500 underline">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/create-quiz"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
      >
        Create New Quiz
      </Link>
    </div>
  );
};

export default UserQuizzes;
