import openai from '../config/openaiConfig.js'

const generateReadmeAI = async (repoData) => {
    try {
        // Create a prompt using repository data
        const prompt = `Generate a README.md for a project with the following details:
        Project Name: ${repoData.name}
        Description: ${repoData.description}
        Language: ${repoData.language}`;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 500,
        });

        return response.data.choices[0].text;
    } catch (error) {
        throw new Error('Error generating README using OpenAI API');
    }
};

export default generateReadmeAI;
