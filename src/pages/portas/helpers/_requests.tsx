import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/porta-request-out`;


export async function getUser(id: any) {
  return axios.get(`${baseUrl}/details/${id}`);
}
export async function getTopologias(){
  return axios.get(`${import.meta.env.VITE_API_URL}/topologias/select`);
}

export async function getReasons(){
  return axios.get(`${import.meta.env.VITE_API_URL}/reason/select`);

}

export async function updateUser(id: any, data: any) {
  return axios.put(`${baseUrl}/topologia/${id}`, data);
}

export async function takeCase(porta_id: number) {
  return axios.get(`${baseUrl}/take/${porta_id}`);
}

export async function regeneratePorta(id: any) {
  return axios.post(`${baseUrl}/regenerate/${id}`);
}
