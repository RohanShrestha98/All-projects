import axios from "axios";
import { baseUrl } from "../config/config";

export default axios.create({
  baseURL: baseUrl,
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
});
