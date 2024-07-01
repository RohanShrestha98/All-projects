import axios from 'axios';
import { getAccessToken, getRefreshToken, getBusinessPartner } from './cookie';
import { setAccessToken } from './cookie';
import toast from 'react-hot-toast';

export const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
const accessToken = getAccessToken();
if (accessToken) {
  backendApi.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
}

export const refreshAccessTokenFn = async () => {
  try {
    const response = await axios.post(
      backendApi.defaults.baseURL + 'auth/token/refresh/',
      {
        refresh: getRefreshToken(),
      }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      window.location.replace('/login');
    }
  }
};

backendApi.interceptors.request.use(config => {
  // if current host is partner domain then check for partner code in cookie and set it in header if exists else redirect to login
  if (window.location.host === import.meta.env.VITE_PARTNER_DOMAIN) {
    if (window.location.pathname === '/login') {
      return config;
    }
    const partnerCode = getBusinessPartner();
    if (partnerCode) {
      config.headers['Partner'] = partnerCode;
    } else {
      window.location.replace('/login');
    }
  }
  return config;
});

backendApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response.statusText === 'Unauthorized' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const response = await refreshAccessTokenFn();
      setAccessToken(response?.access);
      originalRequest.headers.Authorization = `Bearer ${response?.access}`;
      return backendApi(originalRequest);
    } else if (error.response?.status === 403) {
      toast.error('You are not authorized to access this page');
      // window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);

export default backendApi;
