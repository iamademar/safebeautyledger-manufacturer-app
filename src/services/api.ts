import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    throw error;  
  }
};