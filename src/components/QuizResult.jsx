import React from "react";
import { Link } from "react-router-dom";

const QuizResult = ({ score, total, quizId }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
      <p>
        Your score: {score} / {total}
      </p>
      <Link
        to={`/quiz/${quizId}`}
        className="text-blue-500 underline mt-4 block"
      >
        Back to Quiz
      </Link>
    </div>
  );
};

export default QuizResult;
