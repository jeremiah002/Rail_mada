// src/services/apiReservation.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5193/api/v1";

export const getTrains = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trains`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const createTrain = async (trainsData) => {
  try {
    let data = JSON.stringify(trainsData);
    const response = await axios.post(`${API_BASE_URL}/trains`, data, {
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

export const editTrain = async (codeTrains, trainsData) => {
  try {
    let data = JSON.stringify(trainsData);
    const response = await axios.put(
      `${API_BASE_URL}/trains/${codeTrains}`, data, {
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

export const deleteTrain = async (codeTrains) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/trains/${codeTrains}`
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};
