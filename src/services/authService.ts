import axios from 'axios';

// Example base URL for authentication API
const authAPI = axios.create({
  baseURL: 'https://api.agroshield.com/auth', // Replace with your actual auth API URL
});

// Function to login
export const login = async (username: string, password: string) => {
  try {
    const response = await authAPI.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Error logging in');
  }
};

// Function to register a new user
export const register = async (userData: object) => {
  try {
    const response = await authAPI.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Error registering user');
  }
};

// Function to fetch user details using token
export const fetchUserDetails = async (token: string) => {
  try {
    const response = await authAPI.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Error fetching user details');
  }
};

export default {
  login,
  register,
  fetchUserDetails,
};
