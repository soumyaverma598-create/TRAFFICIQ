import api from "./api";

export async function getPredictionData() {
  const response = await api.get("/api/prediction");
  return response.data;
}
