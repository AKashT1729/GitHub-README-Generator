import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Preview from "./Preview";

const InputForm = () => {
  const [repoLink, setRepoLink] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerator = async () => {
    setError(null); // Reset error state

    // Validate the input
    if (!repoLink.trim()) {
      setError("Please enter a valid GitHub repository link.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:3000/api/generate-readme",
        { repoUrl: repoLink }
      );

      // Handle non-200 status responses
      if (response.status !== 200) {
        throw new Error("Failed to generate README. Please try again.");
      }
      setRepoData(response.data.readme);
      
      alert("README.md generated successfully.");
      // Additional handling of response data can be implemented here
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate README.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="relative top-20 mx-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <input
        type="text"
        placeholder="Enter GitHub Repository Link"
        value={repoLink}
        onChange={(e) => setRepoLink(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        type="button"
        onClick={handleGenerator}
        disabled={loading}
        className={`my-3 py-2.5 px-5 w-full text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {loading ? <Loader /> : "Generate README.md"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Note: The README will be automatically generated based on the
        repository's contents.
      </p>
      {repoData && <Preview repoData={repoData} />}
    </div>
  );
};

export default InputForm;
