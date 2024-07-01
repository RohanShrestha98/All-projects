import { useContactData } from "../hooks/useQueryData";

export default function Contact() {
  const { data } = useContactData();
  return <div></div>;
}
