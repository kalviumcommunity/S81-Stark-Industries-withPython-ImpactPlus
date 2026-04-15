import api from "./api";

export async function loginUser(credentials) {
  const response = await api.post("/login", credentials);
  return response.data;
}

export async function signupUser(credentials) {
  const response = await api.post("/signup", credentials);
  return response.data;
}
