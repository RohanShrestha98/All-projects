import Button from "../../components/Button";
import { MailSvg } from "../../assets/allSvg";
// import { CiMail } from "react-icons/ci";

export default function LetsCollaborate() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center py-28">
      <p className="text-[#293056] text-5xl md:text-3xl sm:text-2xl text-center">
        Have a project in mind? <br />
        Lets collaborate
      </p>
      <Button icon={<MailSvg />} buttonName={"hi@ayata.com.np"} />
    </div>
  );
}
