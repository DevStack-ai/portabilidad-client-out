import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/porta-out`;

export async function validateToken(token: string) {
    return axios.get(`${baseUrl}/${token}`);
}
export async function sendSignature(id: number, signature: string) {
    return axios.put(`${baseUrl}/${id}`, { signature });
}

