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

    // Recursive function to find all package.json files in the repository contents
    const findAllPackageJsons = async (path) => {
      const contentsResponse = await axios.get(
        `${repoApiUrl}/contents/${path}`,
        { headers }
      );
      const contents = contentsResponse.data;

      let foundPackageJsons = []; // Array to hold all found package.json URLs

      for (const file of contents) {
        if (file.type === "file" && file.name === "package.json") {
          foundPackageJsons.push(file.download_url); // Add the download URL to the array
        }
        if (file.type === "dir") {
          // Recursively search in subdirectories
          const found = await findAllPackageJsons(`${path}/${file.name}`);
          foundPackageJsons = foundPackageJsons.concat(found); // Merge results
        }
      }
      return foundPackageJsons; // Return all found package.json URLs
    };

    // Start searching for package.json from the root directory
    const packageJsonUrls = await findAllPackageJsons("");
    const packageJsonDataArray = [];

    for (const packageJsonUrl of packageJsonUrls) {
      const packageJsonResponse = await axios.get(packageJsonUrl, { headers });
      const packageJsonData = packageJsonResponse.data;

      // Extract dependencies
      const dependencies = packageJsonData.dependencies || {};
      const devDependencies = packageJsonData.devDependencies || {};

      packageJsonDataArray.push({
        url: packageJsonUrl,
        dependencies,
        devDependencies,
      });
    }

    // Return essential repository information along with all found package.json data
    return {
      name: repoData.name,
      description: repoData.description,
      language: repoData.language,
      packageJsons: packageJsonDataArray, // Array of all package.json data
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
