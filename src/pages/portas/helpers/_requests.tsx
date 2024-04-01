import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/porta-request`;


export async function getUser(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}
