import axios from "axios";

const API_BASE_URL = "https://0c89-194-44-90-74.eu.ngrok.io";

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
