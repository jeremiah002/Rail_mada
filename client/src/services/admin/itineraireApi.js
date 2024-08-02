// src/services/apiReservation.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5193/api/v1";

export const getItineraires = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/itineraires`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const createItineraire = async (itinerairesData) => {
  try {
    let data = JSON.stringify(itinerairesData);
    const response = await axios.post(`${API_BASE_URL}/itineraires`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};

export const editItineraire = async (codeItineraire, itinerairesData) => {
  try {
    let data = JSON.stringify(itinerairesData);
    const response = await axios.put(
      `${API_BASE_URL}/itineraires/${codeItineraire}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};

export const deleteItineraire = async (codeItineraire) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/itineraires/${codeItineraire}`
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};
