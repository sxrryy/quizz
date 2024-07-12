import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const UserResults = () => {
  const [results, setResults] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/results?userId=${user.id}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Failed to fetch results", error);
      }
    };

    fetchResults();
  }, [user.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id} className="mb-2">
            Quiz ID: {result.quizId} - Score: {result.score} / {result.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserResults;
