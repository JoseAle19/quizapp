import axios from "axios";
const urlLocal = "http://localhost:4000/";
const urlProduccion = "https://apiquizapp-production.up.railway.app/";
export const quizApi = axios.create({
  baseURL: urlLocal,
});

export const urlProduccionApi = urlLocal;
