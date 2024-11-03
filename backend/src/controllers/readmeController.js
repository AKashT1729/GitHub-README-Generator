import fetchRepoData from "../services/githubService.js";
// import generateReadmeAI from '../services/openaiService.js';

const generateReadme = async (req, res) => {
  const { repoUrl } = req.body;

  try {
    // Fetch and analyze GitHub repository data
    const repoData = await fetchRepoData(repoUrl);

    // Generate README content using OpenAI
    // const readmeContent = await generateReadmeAI(repoData);
    console.log(repoData);

    // res.status(200).json({ readme: readmeContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default generateReadme;
