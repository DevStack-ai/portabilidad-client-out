import axios from 'axios';

const OAUTH_URL = import.meta.env.VITE_OAUTH_URL;
const APP_CODE = import.meta.env.VITE_APP_CODE;
const CLIENT_SECRET = import.meta.env.VITE_OAUTH_SECRET;




export async function getToken(cose: string) {
    const url = `${OAUTH_URL}/oauth/token`;
  
    return axios.post(url, {
        appCode: APP_CODE,
        code: cose,
        clientSecret: CLIENT_SECRET
    })

}
