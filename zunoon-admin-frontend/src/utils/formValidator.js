export const nameValidator = value => {
  const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const nameStringValidator = value => {
  if (value.trim() === "") return false;
  return true;
};
export const emptyStringValidator = value => {
  const regex = /(^[a-zA-Z][a-zA-Z]{0,20}[a-zA-Z]$)/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const emailValidator = value => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const contactValidator = value => {
  const regex = /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const addressValidator = value => {
  const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const passwordValidator = value => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const dateValidator = value => {
  const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (!regex.test(value.trim())) return false;
  return true;
};
export const urlValidator = value => {
  const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const alphaNumericValidator = value => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const numberValidator = value => {
  const regex = /^[0-9]+$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

export const imageSizeValidator = image => {
  if (image) {
    let kb = image.size / 1024;
    let mb = kb / 1024;
    if (mb > 2) {
      return false;
    }
  }
  return true;
};
