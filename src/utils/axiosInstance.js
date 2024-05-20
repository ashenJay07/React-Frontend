import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "https://pleased-vigorously-ostrich.ngrok-free.app/",
  // We add other configuration options here, such as headers
});

export const axiosInstanceNgork = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "https://pleased-vigorously-ostrich.ngrok-free.app/",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
  // We add other configuration options here, such as headers
});

export default axiosInstance;
