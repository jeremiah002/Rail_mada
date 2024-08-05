import axios from "axios";

const API_BASE_URL = "http://localhost:5193/api/v1";

export const getVoyageurs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/voyageurs`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const createVoyageur = async (voyageurData) => {

  try {
    let data = JSON.stringify(voyageurData);
    console.log("Données envoyées:", data);

    const response = await axios.post(
      `${API_BASE_URL}/voyageurs`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Réponse du serveur:", response);
    return response;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};