import { useEffect, useState } from "react";

const MyResults = ({ user }) => {
  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchResultsAndQuizzes = async () => {
      try {
        const resultsResponse = await fetch(
          `http://localhost:5000/results?userId=${user.id}`
        );
        const resultsData = await resultsResponse.json();
        setResults(resultsData);

        const quizzesResponse = await fetch("http://localhost:5000/quizzes");
        const quizzesData = await quizzesResponse.json();
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Błąd pobierania danych", error);
      }
    };

    fetchResultsAndQuizzes();
  }, [user.id]);

  const getQuizTitle = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    return quiz ? quiz.title : "Nieznany quiz";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Moje wyniki</h1>
      <br />
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            Quiz: {getQuizTitle(result.quizId)}, Wynik: {result.result}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyResults;
