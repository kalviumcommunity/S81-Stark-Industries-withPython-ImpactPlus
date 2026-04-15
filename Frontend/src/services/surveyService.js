import api from "./api.js";

export async function submitSurvey(feedback) {
  const response = await api.post("/surveys", { feedback });
  return response.data;
}

export async function fetchSurveyStats() {
  const response = await api.get("/surveys");
  return response.data;
}
