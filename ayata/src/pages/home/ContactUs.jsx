import { GoArrowRight } from "react-icons/go";
import InputField from "../../components/InputField";
import { LuUploadCloud } from "react-icons/lu";

export default function ContactUs() {
  return (
    <div className="h-screen md:h-full  grid grid-cols-2 md:grid-cols-1 gap-20 px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4  py-24">
      <div className=" flex flex-col gap-12">
        <h1 className="text-[92px] md:text-[80px] sm:text-[60px] font-semibold leading-none text-[#293056]">
          Let’s start <br /> something <br /> <i>together</i>
        </h1>
        <p className="text-[#667085] text-base font-normal">
          Secure your connected life with the one solution that provides you
          with the greatest digital security and a great user experience.
        </p>
        <div className="flex items-center   ">
          <div className="flex items-center justify-center w-[240px] py-2 border-[#596273] hover:bg-[#596273] hover:text-white rounded-full cursor-pointer border gap-3 text-[#596273]">
            hi@ayata.com.np <GoArrowRight size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-8 md:px-6 sm:px-0 py-2">
        <InputField placeholder={"Your Name"} />
        <InputField placeholder={"Position"} />
        <InputField placeholder={"Your Email"} />
        <InputField placeholder={"Contact Number"} />
        <textarea
          id=""
          cols="30"
          rows="6"
          placeholder="Your message to us"
          className="border outline-none min-h-20 rounded-lg px-4 py-2"
        ></textarea>
        <div>
          <label
            htmlFor="attachment"
            className=" bg-[#F5F5F5] font-medium text-[#344054] cursor-pointer flex flex-grow justify-center items-center gap-2 outline-none w-full rounded px-4 py-2"
          >
            <LuUploadCloud /> Add Attachment
          </label>
          <input id="attachment" className="hidden" type="file" />
        </div>
        <div className="flex items-center justify-center  py-2 border-[#4E5BA6] bg-[#4E5BA6] hover:bg-white text-white rounded-full cursor-pointer border gap-3 hover:text-[#4E5BA6]">
          Submit
        </div>
      </div>
    </div>
  );
}
