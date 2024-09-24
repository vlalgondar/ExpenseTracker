import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


// Check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);  // Current time in seconds
  return exp < now;
};

// Refresh the access token using the refresh token
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh,
    });
    const { access } = response.data;
    localStorage.setItem('access_token', access);  // Store new access token
    return access;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};

// Get the access token, refresh if necessary
export const getAuthToken = async () => {
  let accessToken = localStorage.getItem('access_token');
  if (isTokenExpired(accessToken)) {
    accessToken = await refreshToken();
  }
  return accessToken;
};



const fetchExpenses = async () => {
    const accessToken = await getAuthToken();
    if (!accessToken) {
      console.error('Unable to get access token.');
      return;
    }
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/expenses/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };