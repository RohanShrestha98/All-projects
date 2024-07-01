import Cookies from 'universal-cookie';
import { decrypt, encrypt } from './encryption';

const cookie = new Cookies();

export const ACCESS_TOKEN_NAME = '_a';
export const PARTNER_CODE_NAME = '_p';
export const REFRESH_TOKEN_NAME = '_r';
export const USER_DETAILS_NAME = 'rls';

export const getAccessToken = () => decrypt(cookie.get(ACCESS_TOKEN_NAME));
export const getRefreshToken = () => decrypt(cookie.get(REFRESH_TOKEN_NAME));
export const getUserDetails = () => decrypt(cookie.get(USER_DETAILS_NAME));
export const getBusinessPartner = () => decrypt(cookie.get(PARTNER_CODE_NAME));
export const getLanguage = () => decrypt(cookie.get('lang'));

export const removeAccessToken = () =>
  cookie.remove(ACCESS_TOKEN_NAME, {
    domain: window.location.hostname,
    path: '/',
  });
export const removeRefreshToken = () =>
  cookie.remove(REFRESH_TOKEN_NAME, {
    domain: window.location.hostname,
    path: '/',
  });

export const removePartnerCode = () =>
  cookie.remove(PARTNER_CODE_NAME, {
    domain: window.location.hostname,
    path: '/',
  });

export const setAccessToken = (accessToken: string) => {
  cookie.set(ACCESS_TOKEN_NAME, encrypt(accessToken), {
    domain: window.location.hostname,
    path: '/',
    secure: false,
    sameSite: false,
    expires: undefined,
  });
};

export const setPartnerCode = (partnerCode: string) => {
  cookie.set(PARTNER_CODE_NAME, encrypt(partnerCode), {
    domain: window.location.hostname,
    path: '/',
    secure: false,
    sameSite: false,
    expires: undefined,
  });
};

export const setRefreshToken = (refreshToken: string) => {
  const now = new Date();
  now.setDate(now.getDate() + 25);
  cookie.set(REFRESH_TOKEN_NAME, encrypt(refreshToken), {
    domain: window.location.hostname,
    path: '/',
    secure: false,
    sameSite: false,
    expires: undefined,
  });
};

export const setUserDetails = (details: object) => {
  const now = new Date();
  now.setDate(now.getDate() + 25);
  cookie.set(USER_DETAILS_NAME, encrypt(details), {
    domain: window.location.hostname,
    path: '/',
    secure: false,
    sameSite: false,
    expires: undefined,
  });
};

export default cookie;

export const setLanguage = (lang: string) => {
  cookie.set('lang', encrypt(lang), {
    domain: window.location.hostname,
    path: '/',
    secure: false,
    sameSite: false,
    expires: undefined,
  });
};
