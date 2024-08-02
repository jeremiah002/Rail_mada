// src/services/apiReservation.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5193/api/v1';

export const createVoyageur = async (voyageurData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/voyageurs`, voyageurData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données:', error);
    throw error;
  }
};
