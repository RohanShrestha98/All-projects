/* eslint-disable no-unused-vars */
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});
