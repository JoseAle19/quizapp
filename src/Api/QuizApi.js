import axios from "axios";
export const quizApi = axios.create({
    baseURL: "http://localhost:4000/",
})
