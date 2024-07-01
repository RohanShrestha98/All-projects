import traingle from "../../assets/bannertraingle.svg";
import Button from "../../components/Button";

export default function CareerBanner() {
  return (
    <div className="bg-black relative flex items-center h-[280px] px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 overflow-hidden w-full">
      <div className="flex flex-col gap-5">
        <p className="text-[#F2F4F7] font-normal text-2xl md:text-xl">
          Don’t see the internship you’re looking for? <br /> Worry not. Apply
          anyway and our team will definitely get <br /> back to you after a
          while.
        </p>
        <Button buttonName={"Send your CV"} />
      </div>
      <img src={traingle} className="absolute top-0 right-0" alt="" />
    </div>
  );
}
