import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "https://localhost:7140/"
console.log(API_URL, "apiulr");

const api = axios.create({
  baseURL: API_URL,
  timeout: 50_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
