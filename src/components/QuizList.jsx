import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-2">
            <Link to={`/quiz/${quiz.id}`} className="text-blue-500 underline">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
