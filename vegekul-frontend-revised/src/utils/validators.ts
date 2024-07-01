import moment from "moment";

import dateFormats from "../constants/date";

export const numberValidator = (value: any) => {
  const valid = !Number.isNaN(parseInt(value));

  if (!valid) {
    return "Must be a number";
  }
  return "";
};

export const stringValidator = (value: any) => {
  const valid = typeof value === "string" && isNaN(Number(value));

  if (!valid) {
    return "Value should not be a number";
  }
  return "";
};

export const dateStringValidator = (dateString: string) => {
  const date = moment(dateString.trim(), dateFormats, true);
  if (!date.isValid()) {
    return "Invalid date format";
  }

  return "";
};
