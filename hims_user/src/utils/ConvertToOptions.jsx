export default function ConvertToOptions(data) {
  return data?.map((item) => {
    return { value: item?.idx, label: item?.title, id: item?.id };
  });
}
