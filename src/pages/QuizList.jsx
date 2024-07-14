import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizList = ({ user }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:5000/quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Błąd pobierania quizów", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dostępne quizy</h1>
      <br />
      {user && (
        <div className="mb-4">
          <Link to="/create-quiz" className="bg-green-500 text-white p-2">
            Stwórz nowy quiz
          </Link>
        </div>
      )}
      {quizzes.length === 0 ? (
        <div>Żaden quiz nie jest dostępny.</div>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
