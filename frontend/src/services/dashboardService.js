import api from "./api";

export async function getDashboardData() {
  const response = await api.get("/api/dashboard");
  return response.data;
}