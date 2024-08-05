import axios from "axios";

const API_BASE_URL = "http://localhost:5193/api/v1";

export async function sendEmail(to, subject, body) {
  try {
    const response = await axios.post(`${API_BASE_URL}/email/send`, null, {
      params: {
        to: to,
        subject: subject,
        body: body,
      },
    });
    console.log(response.status, response.data);
    return response;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}
