/* eslint-disable no-unused-vars */
import axios from "axios";

const hostname = window.location.hostname.split(".");
const isTestServer = hostname[0]?.slice(0,4)==="test" || import.meta.env.VITE_SUBDOMAIN_NAME?.slice(0,4) === "test"

export default axios.create({
 baseURL:isTestServer? import.meta.env.VITE_TEST_BACKEND_BASE_URL:import.meta.env.VITE_BACKEND_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL:isTestServer? import.meta.env.VITE_TEST_BACKEND_BASE_URL:import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-type": "application/json",
    subdomain: import.meta.env.VITE_SUBDOMAIN_NAME ?? hostname[0],
  },  
});
