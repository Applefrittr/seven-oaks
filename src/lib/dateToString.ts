export default function dateToString(date: string | Date) {
  return date.toLocaleString("en-us", { dateStyle: "long" });
}
