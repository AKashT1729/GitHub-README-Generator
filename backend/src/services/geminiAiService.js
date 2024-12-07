import genAI from "../config/geminiAiConfig.js";

const generateReadmeAI = async (repoData) => {
  try {
    // Create a prompt using repository data
    const prompt = `Generate a README.md for a project with the following details:
         ${JSON.stringify(repoData)}`;
    // console.log(prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());

    return result.response.text();
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error generating README using OpenAI API");
  }
};

export default generateReadmeAI;
