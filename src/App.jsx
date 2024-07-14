import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./router";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex-grow">
        <AppRouter user={user} onLogin={handleLogin} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
