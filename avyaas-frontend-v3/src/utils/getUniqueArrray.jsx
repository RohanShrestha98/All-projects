export const getUniqueArray = (data, key) => {
  return [...new Map(data?.map((item) => [key[item], item])).values()];
};
