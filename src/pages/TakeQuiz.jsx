import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const { register, handleSubmit, getValues } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [id]);

  const onSubmit = async () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const answers = getValues("answers");
      let correctCount = 0;
      quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) correctCount++;
      });
      const result = (correctCount / quiz.questions.length) * 100;
      setResult(result);

      const user = JSON.parse(localStorage.getItem("user"));
      await fetch("http://localhost:5000/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, quizId: quiz.id, result }),
      });
    }
  };

  if (!quiz) return <div>Ładowanie...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      {result !== null ? (
        <div className="w-64 h-64 mx-auto">
          <Pie
            data={{
              labels: ["Correct", "Incorrect"],
              datasets: [
                {
                  data: [result, 100 - result],
                  backgroundColor: ["#4caf50", "#f44336"],
                },
              ],
            }}
          />
          <div className="text-center text-2xl mt-4">Wynik: {result}%</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <br />
            <h2 className="text-xl">
              {quiz.questions[currentQuestionIndex].question}
            </h2>
            <br />
            {quiz.questions[currentQuestionIndex].answers.map(
              (answer, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    {...register(`answers.${currentQuestionIndex}`)}
                    value={answer}
                  />
                  <label>{answer}</label>
                </div>
              )
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Następne
          </button>
        </form>
      )}
    </div>
  );
};

export default TakeQuiz;
