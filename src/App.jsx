import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import QuizList from "./components/QuizList";
import CreateQuiz from "./components/CreateQuiz";
import UserQuizzes from "./components/UserQuizzes";
import EditQuiz from "./components/EditQuiz";

const App = () => {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    // Dodaj ładowanie, gdy AuthContext nie jest jeszcze zainicjowane
    return null;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/quizzes"
            element={user ? <QuizList /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-quiz"
            element={user ? <CreateQuiz /> : <Navigate to="/login" />}
          />
          <Route
            path="/user-quizzes"
            element={user ? <UserQuizzes /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-quiz/:id"
            element={user ? <EditQuiz /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
