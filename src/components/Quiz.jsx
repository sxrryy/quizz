import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/quizzes/${id}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(""));
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      answers[currentQuestion] === quiz.questions[currentQuestion].correctOption
    ) {
      setScore(score + 1);
    }
    setShowResult(true);

    if (currentQuestion === quiz.questions.length - 1 && user) {
      try {
        await axios.post("http://localhost:3000/results", {
          userId: user.id,
          quizId: quiz.id,
          score: score + 1,
          total: quiz.questions.length,
        });
      } catch (error) {
        console.error("Failed to save result", error);
      }
    }
  };

  const nextQuestion = () => {
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="container mx-auto p-4">
      {quiz ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="font-semibold">
                {quiz.questions[currentQuestion].question}
              </h2>
              {quiz.questions[currentQuestion].options.map((o, index) => (
                <div key={index} className="mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={o}
                      checked={answers[currentQuestion] === o}
                      onChange={() => handleChange(o)}
                      className="form-radio h-5 w-5 text-green-600 mr-2"
                      disabled={showResult}
                    />
                    {o}
                  </label>
                </div>
              ))}
            </div>
            {!showResult ? (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm Answer
              </button>
            ) : (
              <>
                <p className="mt-4">
                  {answers[currentQuestion] ===
                  quiz.questions[currentQuestion].correctOption
                    ? "Correct!"
                    : `Wrong! Correct answer: ${quiz.questions[currentQuestion].correctOption}`}
                </p>
                {currentQuestion < quiz.questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Next Question
                  </button>
                ) : (
                  <p className="mt-4">
                    Quiz Completed! Your score: {score} /{" "}
                    {quiz.questions.length}
                  </p>
                )}
              </>
            )}
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Quiz;
