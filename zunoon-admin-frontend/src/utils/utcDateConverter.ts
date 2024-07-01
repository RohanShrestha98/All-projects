export default function UtcDateConverter(localDate: any) {
  const date = new Date(localDate);
  return Date.UTC(
    date?.getUTCFullYear(),
    date?.getUTCMonth(),
    date?.getUTCDate(),
    date?.getUTCHours(),
    date?.getUTCMinutes(),
    date?.getUTCSeconds(),
  );
}
