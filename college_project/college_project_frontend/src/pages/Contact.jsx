import { useContactData } from "../hooks/useQueryData";

export default function Contact() {
  const { data } = useContactData();
  console.log("data", data);
  return <div></div>;
}
