// src/services/apiReservation.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5193/api/v1";
const TOKEN = localStorage.getItem("authToken");

export const getTrains = async () => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/trains`, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const createTrain = async (trainsData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(trainsData);
    const response = await axios.post(`${API_BASE_URL}/trains`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};

export const editTrain = async (codeTrains, trainsData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(trainsData);
    const response = await axios.put(
      `${API_BASE_URL}/trains/${codeTrains}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};

export const deleteTrain = async (codeTrains) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/trains/${codeTrains}`,
      {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};
