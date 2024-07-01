import traingle from "../../assets/bannertraingle.svg";

export default function Solution() {
  return (
    <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 ">
      <div className="flex relative my-12 md:my-4 ">
        <div className=" flex flex-col gap-6 bg-[#1D1D20] w-full p-10 rounded-3xl ">
          <h1 className="text-[#F8F9FC] font-bold text-6xl md:text-4xl w-1/2 md:w-[80%]">
            Solutions we crafted for our clients
          </h1>
          <p className="text-base text-[#F2F4F7] w-1/2 md:w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. libero
            et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum
          </p>
        </div>
        <img className=" absolute top-0 right-0 h-full" src={traingle} alt="" />
      </div>
    </div>
  );
}
