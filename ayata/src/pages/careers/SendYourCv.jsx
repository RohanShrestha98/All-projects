import lineBackground from "../../assets/linebackground.svg";
import Button from "../../components/Button";
export default function SendYourCv() {
  return (
    <div className="relative h-[70vh] md:h-full md:py-16 flex items-center overflow-hidden px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 gap-2">
      <div className="w-[60%] md:w-full flex flex-col gap-6">
        <h1 className="text-[#293056] font-bold leading-snug text-6xl md:text-4xl sm:text-2xl">
          Find your dream job at <br />{" "}
          <span className="text-[#667085]">Ayata Incorporation</span>
        </h1>
        <p className="text-[#667085] leading-normal ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. libero et
        </p>
        <Button buttonName={"Send your CV"} width={240} />
      </div>
      <img
        className=" absolute top-0 right-0 h-full"
        src={lineBackground}
        alt=""
      />
    </div>
  );
}
