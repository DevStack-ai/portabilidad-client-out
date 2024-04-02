import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/topologias`;


export async function getUser(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}

export async function createUser(data: any) {
  return axios.post(`${baseUrl}/create`, data);

}
export async function updateUser(id: any, data: any) {
  return axios.put(`${baseUrl}/update/${id}`, data);
}