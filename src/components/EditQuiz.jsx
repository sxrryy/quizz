import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const EditQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/quizzes/${id}`);
        setTitle(response.data.title);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/quizzes/${id}`, {
        title,
        questions,
        userId: user.id,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to update quiz", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4">
            <label className="block text-gray-700">Question {qIndex + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
            <label className="block text-gray-700 mt-2">Options</label>
            {q.options.map((o, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={o}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                className="mt-1 block w-full px-3 py-2 border rounded"
                required
              />
            ))}
            <label className="block text-gray-700 mt-2">Answer</label>
            <input
              type="text"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(qIndex, "answer", e.target.value)
              }
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;
