import api from "./api";

export async function fetchAnalytics() {
  const response = await api.get("/analytics");
  return response.data;
}

export async function fetchRecommendations() {
  const response = await api.get("/recommendations");
  return response.data;
}
