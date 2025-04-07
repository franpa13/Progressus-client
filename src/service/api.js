import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL, "apiulr");

const api = axios.create({
  baseURL: API_URL,
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
