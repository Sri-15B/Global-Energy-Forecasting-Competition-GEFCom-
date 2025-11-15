import axios from "axios";

const API_BASE = "https://your-backend-url.onrender.com"; 
// Replace with your actual backend URL if needed

export const predictLoad = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/predict`, data);
    return res.data;
  } catch (err) {
    console.error("Prediction error:", err);
    throw err;
  }
};
