import axios from "axios";
import config from "../config";
import { getRefreshToken, setAccessToken } from "./token";

/**
 *
 * @returns Promise
 * -resolve promise resolve returns response
 * -reject throws error
 */
export async function refreshToken(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const refreshTokenValue = getRefreshToken();
    if (refreshTokenValue) {
      try {
        const accessToken = await renewToken(refreshTokenValue);
        if (typeof accessToken == "string") {
          resolve(accessToken);
        } else {
          reject(new Error(""));
          setAccessToken("");
        }
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("token not found"));
    }
  });
}

/**
 * It takes a refresh token, sends it to the server, and returns a new access token
 * @param {string} refreshToken - The refresh token that was returned from the login request.
 * @returns A promise that resolves to a string or an error.
 */
export async function renewToken(refreshToken: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${config.baseURI + config.endpoints.auth.refresh}`, {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        setAccessToken(response?.data?.access);
        resolve(response?.data?.access);
      } else {
        setAccessToken("");
        reject(new Error("not 200"));
      }
    } catch (error) {
      reject(error);
      setAccessToken("");
    }
  });
}
