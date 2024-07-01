import dayjs from 'dayjs';

export default function ConvertUTCDate(propsDate,format) {
    const localDate = dayjs(propsDate).toDate().toLocaleDateString();
    const date = dayjs(localDate).format(format) 
  return date
}
