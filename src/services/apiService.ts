import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'https://api.agroshield.com', // Replace with your actual API URL
});

// Example function to fetch data for the dashboard
export const fetchDashboardData = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Error fetching dashboard data');
  }
};

// Function to fetch FIR data
export const fetchFIRCases = async () => {
  try {
    const response = await api.get('/fir-cases');
    return response.data;
  } catch (error) {
    console.error('Error fetching FIR cases:', error);
    throw new Error('Error fetching FIR cases');
  }
};

// Example for POST request
export const createInspectionTask = async (taskData: object) => {
  try {
    const response = await api.post('/inspection-tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating inspection task:', error);
    throw new Error('Error creating inspection task');
  }
};

export default api;
