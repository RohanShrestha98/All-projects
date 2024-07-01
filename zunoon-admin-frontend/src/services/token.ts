/**
 * for getting tokens
 */

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/storage";
import { get, set } from "../utils/storage";

export function getAccessToken() {
  const accessToken: string | null = get(ACCESS_TOKEN_KEY);
  if (accessToken) {
    return JSON.parse(accessToken);
  } else {
    return null;
  }
}

/**
 *
 * @returns string | null -token
 */
export function getRefreshToken(): string | null {
  const refreshToken: string | null = get(REFRESH_TOKEN_KEY);
  if (refreshToken) {
    return JSON.parse(refreshToken);
  } else {
    return null;
  }
}

/**
 * set Access-token in localstorage
 * @param {string} accessToken
 */
export function setAccessToken(accessToken: string): void {
  set(ACCESS_TOKEN_KEY, accessToken);
}
/**
 *set refresh token in localstorage
 * @param {string} refreshToken
 */
export function setRefreshToken(refreshToken: string): void {
  set(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 *
 * @param {object} param0 -{accessToken:string , refreshToken string}
 */
interface setTokensParams {
  accessToken: string;
  refreshToken: string;
}

export function setTokens({ accessToken, refreshToken }: setTokensParams) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}
