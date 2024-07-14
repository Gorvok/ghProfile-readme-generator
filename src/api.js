import axios from 'axios';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchGitHubUser = async (username) => {
    try {
        const response = await githubApi.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub user data', error);
        throw error;
    }
};
