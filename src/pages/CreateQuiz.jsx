import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateQuiz = ({ user }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      questions: [
        { question: "", correctAnswer: "", answers: ["", "", "", ""] },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await fetch("http://localhost:5000/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: user.id }),
      });
      navigate("/quizzes");
    } catch (error) {
      console.error("Wystąpił błąd podczas tworzenia quizu:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Tworzenie quizu</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Tytuł:</label>
          <input
            {...register("title", { required: "Tytuł wymagany" })}
            className="border p-2 w-full"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4">
            <label>Pytanie:</label>
            <input
              {...register(`questions.${index}.question`, {
                required: "Pytanie wymagane",
              })}
              className="border p-2 w-full"
            />
            {errors.questions?.[index]?.question && (
              <span className="text-red-500">
                {errors.questions[index].question.message}
              </span>
            )}
            <label>Poprawna odpowiedź:</label>
            <input
              {...register(`questions.${index}.correctAnswer`, {
                required: "Poprawna odpowiedź wymagana",
              })}
              className="border p-2 w-full"
            />
            {errors.questions?.[index]?.correctAnswer && (
              <span className="text-red-500">
                {errors.questions[index].correctAnswer.message}
              </span>
            )}
            <label>Odpowiedzi:</label>
            {item.answers.map((answer, answerIndex) => (
              <input
                key={answerIndex}
                {...register(`questions.${index}.answers.${answerIndex}`, {
                  required: "Odpowiedź wymagana",
                })}
                className="border p-2 w-full mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white p-2"
            >
              Usuń pytanie
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              question: "",
              correctAnswer: "",
              answers: ["", "", "", ""],
            })
          }
          className="bg-green-500 text-white p-2"
        >
          Dodaj pytanie
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Stwórz quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
