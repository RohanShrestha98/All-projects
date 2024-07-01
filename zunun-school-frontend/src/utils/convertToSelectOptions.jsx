export const convertToSelectOptions = lists => {
  const options = lists?.map(item => {
    const label =
      item?.name?.slice(0, 1).toUpperCase() +
      item?.name?.slice(1, item?.name?.length);
    return { value: item?.id, label: label };
  });
  return options;
};
