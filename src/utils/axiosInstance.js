import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // We add other configuration options here, such as headers
});

export default axiosInstance;
