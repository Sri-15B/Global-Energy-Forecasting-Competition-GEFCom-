const API_BASE = "https://global-energy-forecasting-competition.onrender.com";

export async function getForecast(date) {
  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });

  if (!response.ok) {
    throw new Error("Backend error: " + response.status);
  }

  return response.json();
}
