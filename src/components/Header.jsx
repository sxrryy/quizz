import { Link } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Quiz App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {!user ? (
              <>
                <li>
                  <Link to="/login">Zaloguj</Link>
                </li>
                <li>
                  <Link to="/register">Zarejestruj</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/create-quiz">Stwórz quiz</Link>
                </li>
                <li>
                  <Link to="/my-results">Moje wyniki</Link>
                </li>
                <li>
                  <Link to="/quizzes">Quizy</Link>
                </li>
                <li>
                  <button onClick={onLogout}>Wyloguj</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
