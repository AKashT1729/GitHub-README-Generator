import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const Preview = () => {
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/generatedData"
        );
        setRepoData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [0]);

  // Function to copy description to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(repoData.description);
    alert("Description copied to clipboard!");
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {repoData && (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-28 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            GitHub Repository Name:{" "}
            <span className="font-normal">{repoData.full_name}</span>
          </h2>
          {/* Container for the description with relative positioning */}
          <div className="relative mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {/* Absolute positioned Copy button in the top-right corner */}
            <button
              onClick={copyToClipboard}
              className="absolute top-0 right-2 px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Copy
            </button>
            {/* Description content */}
            {loading && <Loader />}
            <p className="text-gray-800 dark:text-gray-300">
              {repoData.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
