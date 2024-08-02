import axios from "axios";

export async function auth(formData) {
    try {
      const response = await axios.post(`https://none`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.status, response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
}