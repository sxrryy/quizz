import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctOption: "" },
  ]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOption = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/quizzes", {
        title,
        questions,
        userId: user.id,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Quiz Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            {q.options.map((o, oIndex) => (
              <div key={oIndex} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={o}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="border rounded w-full py-2 px-3 text-gray-700 mr-2"
                />
                <input
                  type="radio"
                  name={`correct-option-${qIndex}`}
                  checked={q.correctOption === o}
                  onChange={() => handleCorrectOptionChange(qIndex, o)}
                  className="form-radio h-5 w-5 text-green-600"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
