import axios from "axios";

export const API_URL =
  "https://global-energy-forecasting-competition.onrender.com";

export const predictLoad = async (features) => {
  const res = await axios.post(`${API_URL}/predict`, { features });
  return res.data.predicted_load;
};
