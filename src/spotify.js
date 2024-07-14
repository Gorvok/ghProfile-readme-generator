import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

export const getAccessToken = async (code) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await axios.post('https://accounts.spotify.com/api/token', params);
    return response.data.access_token;
};

export const fetchRecentlyPlayed = async (accessToken) => {
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.items;
};

export const getAuthUrl = () => {
    const scopes = ['user-read-recently-played'];
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
};
