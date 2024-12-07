import React from "react";

const Preview = ({ repoData }) => {
  if (!repoData) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 dark:text-gray-300">No data to preview.</p>
      </div>
    );
  }

  // Function to copy description to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(repoData);
    alert("Description copied to clipboard!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10 border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Create readme.md file and paste it here 
        
      </h2>
      <div className="relative mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {/* Absolute positioned Copy button in the top-right corner */}
        <button
          onClick={copyToClipboard}
          className="absolute top-0 right-2 px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Copy
        </button>
        <p className="text-gray-800 dark:text-gray-300">{repoData}</p>
      </div>
    </div>
  );
};

export default Preview;
