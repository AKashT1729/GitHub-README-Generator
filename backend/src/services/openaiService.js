import openai from "../config/openaiConfig.js";

const generateReadmeAI = async (repoData) => {
  try {
    // Create a prompt using repository data
    const prompt = `Generate a README.md for a project with the following details:
         ${JSON.stringify(repoData)}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 64,
    });
    console.log(response);

    return response.data.choices[0].text;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error generating README using OpenAI API");
  }
};

export default generateReadmeAI;
