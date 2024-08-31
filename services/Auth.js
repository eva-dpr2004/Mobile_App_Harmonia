import axios from "axios";

const API_URL = "http://localhost:3001";

export const createUser = (userData) => {
  return axios.post(`${API_URL}/auth`, userData);
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/auth`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error);
    throw error;
  }
};

export const loginUser = async (sanitizedData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, sanitizedData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion:", error);
    throw error;
  }
};