import CryptoJS from 'crypto-js';
import { removeAccessToken, removeRefreshToken } from './cookie';

export const encrypt = (data: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    import.meta.env.VITE_SECRET_KEY
  ).toString();
};

export const decrypt = (data: any) => {
  if (!data) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    // there is invalid data in cookie so we remove it
    removeAccessToken();
    removeRefreshToken();
    return null;
  }
};
