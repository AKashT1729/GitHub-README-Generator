import axios from 'axios';
const fetchRepoData = async (repoUrl) => {
    console.log("github Service uRL",repoUrl);
    
    try {
        const repoApiUrl = `https://api.github.com/repos/${repoUrl.split('github.com/')[1]}`;
        
        // console.log("github Service API URL",repoApiUrl);
        
        //get data from URL and How
        // Fetch repository data (e.g., package.json, README.md)
        const repoResponse = await axios.get(repoApiUrl);
        console.log("github Service repoRespondse",repoResponse);
        
        const repoData = repoResponse.data;
        console.log("github Service DAta",repoData);
        
        // Process and return essential information
        // Parse necessary fields such as name, description, etc.
        return {
            name: repoData.name,
            description: repoData.description,
            language: repoData.language,
            // Add other parsed data as needed
        };
    } catch (error) {
        throw new Error('Error fetching repository data');
    }
};

export default fetchRepoData;
