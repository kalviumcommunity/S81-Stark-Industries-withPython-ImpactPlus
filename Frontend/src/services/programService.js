import api from "./api";

export async function fetchPrograms(filters = {}) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );
  const response = await api.get("/programs", { params });
  return response.data.programs;
}

export async function createProgram(data) {
  const response = await api.post("/programs", data);
  return response.data.program;
}

export async function updateProgram(id, data) {
  const response = await api.put(`/programs/${id}`, data);
  return response.data.program;
}

export async function deleteProgram(id) {
  const response = await api.delete(`/programs/${id}`);
  return response.data;
}
