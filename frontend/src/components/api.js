
import axios from 'axios';
import {jwtDecode}  from 'jwt-decode';

// Function to handle logout by clearing tokens
export const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  // Optionally, clear other user-related data
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};

// Function to refresh the access token using the refresh token
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 
    if (!refresh) {
      handleLogout();
      return null;
    }
    const response = await axios.post(`${API_URL}/api/token/refresh/`, {
      refresh,
    });
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    handleLogout(); // Clear tokens
    return null;
  }
};

// Function to get a valid access token, refreshing it if necessary
export const getAuthToken = async () => {
  let accessToken = localStorage.getItem('access_token');
  if (!accessToken || isTokenExpired(accessToken)) {
    accessToken = await refreshToken();
  }
  return accessToken;
};
