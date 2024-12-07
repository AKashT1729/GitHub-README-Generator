import fetchRepoData from "../services/githubService.js";
import generateReadmeAI from "../services/geminiAiService.js";

const generateReadme = async (req, res) => {
  const { repoUrl } = req.body;
  if (!repoUrl) {
    return res.status(400).json({ message: "Repository URL is required." });
  }
  try {
    // Fetch and analyze GitHub repository data
    const repoData = await fetchRepoData(repoUrl);
    // console.log(repoData);

    // Generate README content using OpenAI
    const readmeContent = await generateReadmeAI(repoData);
   return res.status(200).json({ readme: readmeContent });
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: error.message });
  }
};

export default generateReadme;
