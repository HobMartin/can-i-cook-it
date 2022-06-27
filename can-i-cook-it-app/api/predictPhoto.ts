import axios from "axios";

const API_BASE_URL = "https://3b3a-194-44-99-142.eu.ngrok.io";

export const predictImage = async (image: string) => {
  try {
    const resp = await axios.post(
      `${API_BASE_URL}/predict/`,
      { file: image },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return resp.data;
  } catch (e) {
    alert("Error: " + e);
  }
};
