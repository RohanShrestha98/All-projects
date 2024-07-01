import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import config from "../config";
import { refreshToken } from "../services/auth";
import { getAccessToken } from "../services/token";

/* A constant variable that is used to store the base url of the api. */
const BaseURL: string = config.baseURI;

const http: AxiosInstance = axios.create({
  baseURL: BaseURL,
  responseType: "json",
});

type GetHeadersFunction = () => AxiosRequestHeaders;
const getHeaders: GetHeadersFunction = () => {
  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return headerOptions;
};

function GET(url: string, params: any) {
  return http.get(url, {
    headers: getHeaders(),
    params: params,
  });
}

function POST(url: string, data: any) {
  return http.post(url, data, {
    headers: getHeaders(),
    params: {},
  });
}

function POST_FILE(url: string, data: any) {
  return http.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    params: {},
  });
}

function PUT(url: string, data: any) {
  return http.put(url, data, { headers: getHeaders(), params: {} });
}

function PATCH(url: string, data: any) {
  return http.patch(url, data, { headers: getHeaders(), params: {} });
}

function PUT_FILE(url: string, data: any) {
  return http.patch(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    params: {},
  });
}

/**
 * It returns a promise that will resolve to the response of a DELETE request to the given url.
 * @param {string} url - The URL of the API endpoint you want to call.
 * @returns A function that takes a url and returns a promise.
 */
function REMOVE(url: string) {
  return http.delete(url, { headers: getHeaders() });
}

function DELETE(url: string, data: any) {
  return http.delete(url, { headers: getHeaders(), params: {}, data });
}

http.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    const originalConfig = error.config;

    if (error.response.status === 401 && !originalConfig._retry) {
      // originalConfig._retry = true;
      try {
        const newAccessToken: string = await refreshToken();
        if (newAccessToken) {
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          return http(originalConfig);
        }
      } catch (err) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

const httpMethods = {
  GET,
  POST,
  PUT,
  PATCH,
  REMOVE,
  PUT_FILE,
  POST_FILE,
  DELETE,
};

export default httpMethods;
