// src/services/apiReservation.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5193/api/v1";
const TOKEN = localStorage.getItem("authToken");

export const getCategories = async () => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
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

export const createCategorie = async (categoriesData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(categoriesData);
    const response = await axios.post(`${API_BASE_URL}/categories`, data, {
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

export const editCategorie = async (codeCategorie, categoriesData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(categoriesData);
    const response = await axios.put(
      `${API_BASE_URL}/categories/${codeCategorie}`, data, {
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

export const deleteCategorie = async (codeCategorie) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/categories/${codeCategorie}`, {
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
