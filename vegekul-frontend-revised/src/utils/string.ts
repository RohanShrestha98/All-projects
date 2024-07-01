// utils related to string manipulation

import moment from 'moment';

// convert number to string and pad with given number of zeros
// example: padSubstring("0000", 3) => "0003"
export const padSubstring = (pad = '0000', sourceString: string) => {
  return pad.substring(0, pad.length - sourceString.length) + sourceString;
};

export const firstLetterUpperCase = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmptyObject = (obj: any) => {
  for (const i in obj) return false;
  return true;
};

export const convertDateFormat = (date: string, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};
