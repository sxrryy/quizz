import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import MyResults from "./pages/MyResults";
import TakeQuiz from "./pages/TakeQuiz";

function AppRouter({ user, onLogin }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quizzes" element={<QuizList user={user} />} />
      <Route path="/create-quiz" element={<CreateQuiz user={user} />} />
      <Route path="/my-results" element={<MyResults user={user} />} />
      <Route path="/quiz/:id" element={<TakeQuiz />} />
    </Routes>
  );
}

export default AppRouter;
