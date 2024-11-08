import axios from "axios";

const fetchRepoData = async (repoUrl) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const headers = GITHUB_TOKEN
    ? { Authorization: `token ${GITHUB_TOKEN}` }
    : {};

  try {
    // Remove ".git" if present in the URL
    const cleanUrl = repoUrl.replace(/\.git$/, "");

    // Construct API URL from cleaned repo URL
    const repoApiUrl = `https://api.github.com/repos/${cleanUrl.split("github.com/")[1]}`;

    // Fetch repository data
    const repoResponse = await axios.get(repoApiUrl, { headers });
    const repoData = repoResponse.data;

    // Fetch all programming languages used in the repository
    const languagesResponse = await axios.get(`${repoApiUrl}/languages`, { headers });
    const languagesData = languagesResponse.data;

    // List of dependency configuration files to look for
    const dependencyFiles = [
      "package.json",        // JavaScript/Node.js
      "requirements.txt",    // Python
      "Gemfile",             // Ruby
      "build.gradle",        // Java (Gradle)
      "pom.xml",             // Java (Maven)
      "Cargo.toml",          // Rust
      "composer.json",       // PHP
    ];

    // Recursive function to find all specified dependency files in the repository contents
    const findAllDependencyFiles = async (path) => {
      const contentsResponse = await axios.get(`${repoApiUrl}/contents/${path}`, { headers });
      const contents = contentsResponse.data;

      let foundDependencyFiles = []; // Array to hold all found dependency files' URLs

      for (const file of contents) {
        if (file.type === "file" && dependencyFiles.includes(file.name)) {
          foundDependencyFiles.push({
            name: file.name,
            url: file.download_url
          }); // Add the file details to the array
        }
        if (file.type === "dir") {
          // Recursively search in subdirectories
          const found = await findAllDependencyFiles(`${path}/${file.name}`);
          foundDependencyFiles = foundDependencyFiles.concat(found); // Merge results
        }
      }
      return foundDependencyFiles; // Return all found dependency files' details
    };

    // Start searching for dependency files from the root directory
    const dependencyFileUrls = await findAllDependencyFiles("");
    const dependencyDataArray = [];

    // Fetch the contents of each found dependency file
    for (const dependencyFile of dependencyFileUrls) {
      const dependencyResponse = await axios.get(dependencyFile.url, { headers });
      const dependencyContent = dependencyResponse.data;

      // Process the content as JSON for known JSON files or as text for others
      if ((dependencyFile.name === "package.json" || dependencyFile.name === "composer.json") && typeof dependencyContent === "object") {
        // If content is already an object, use it directly; otherwise, parse it
        const parsedData = dependencyContent;
        dependencyDataArray.push({
          file: dependencyFile.name,
          dependencies: parsedData.dependencies || {},
          devDependencies: parsedData.devDependencies || {},
        });
      } else if (typeof dependencyContent === "string" && dependencyFile.name.endsWith(".json")) {
        try {
          const parsedData = JSON.parse(dependencyContent);
          dependencyDataArray.push({
            file: dependencyFile.name,
            dependencies: parsedData.dependencies || {},
            devDependencies: parsedData.devDependencies || {},
          });
        } catch (parseError) {
          console.error(`Error parsing JSON for ${dependencyFile.name}:`, parseError.message);
          dependencyDataArray.push({
            file: dependencyFile.name,
            error: "Invalid JSON format",
          });
        }
      } else {
        // For other file types, return raw content
        dependencyDataArray.push({
          file: dependencyFile.name,
          content: dependencyContent,
        });
      }
    }

    // Return essential repository information along with all found dependency files data
    return {
      name: repoData.name,
      description: repoData.description,
      primaryLanguage: repoData.language,
      languages: languagesData, // Object containing all languages used and their byte sizes
      dependencies: dependencyDataArray, // Array of all found dependency data
    };
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
      console.error("Error Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }

    throw new Error("Error fetching repository data");
  }
};

export default fetchRepoData;
