import axios from 'axios';

const API_BASE_URL = 'https://api-nba-v1.p.rapidapi.com';
const API_HEADERS = {
  'x-rapidapi-key': 'a9d18d5956mshe9693a533ccf7adp144437jsna9263512071d',
  'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
}

// Axios isntance for NBA API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: API_HEADERS,
});

// Generic Data fetch
export const fetchData = async (endpoint: string, params?: Record<string, string | number>) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data; // Adjust based on API's response structure
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// example function for fetching team data
export const fetchAllTeams = async () => {
  try {
    // Fetch all teams without filtering
    const response = await fetchData('/teams'); // Remove the `nbaFranchise` query param
    console.log('API Response:', response);

    // Adjust this based on the response structure
    const allTeams = response.response; // Assuming team data is under `response`
    if (!allTeams || allTeams.length === 0) {
      throw new Error('No teams data found');
    }

    // Filter teams where nbaFranchise is true
    const nbaTeams = allTeams.filter((team: any) => team.nbaFranchise === true);
    console.log('NBA Franchise Teams:', nbaTeams);

    return nbaTeams;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching teams:', error.message);
    } else {
      console.error('Error fetching teams:', error);
    }
    throw error;
  }
};

