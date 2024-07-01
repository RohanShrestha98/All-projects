import InputField from "../../components/InputField";
import SummeryPart from "../../components/SummeryPart";
import Map from "./Map";
import { MailColorSvg, LocationColorSvg, PhoneColorSvg } from "../../assets/allSvg";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function ContactPage() {
  const socialList = [
    {id:1, icon:<FaFacebookF/>, link:"www.facebook.com"},
    {id:2, icon:<FaTwitter/>, link:"www.twitter.com"},
    {id:3, icon:<FaLinkedinIn/>, link:"www.linkedin.com"},
    {id:4, icon:<AiFillInstagram/>, link:"www.instagram.com"},
  ]
  return (
    <div className="flex flex-col gap-10 ">
      {" "}
      <SummeryPart
        title1={"Contact"}
        title2={"Ayata Incorporation"}
        // className={"h-[50vh] w-[90%]"}
        message={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et"
        }
      />
      <div className="px-32 xl:px-24 lg:px-16 ml:px-10 sm:px-4 pb-20">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#191825] rounded-2xl p-6 flex flex-col gap-6 text-[#F5F5F5]">
            <p className="text-xl font-medium leading-6">Ayata Incorporation</p>
            <div className="flex gap-3">
              <LocationColorSvg/>
              <div className="flex flex-col gap-2">
                <p className="text-[15px] font-semibold">Location</p>
                <p className="text-[13px] leading-5">Anamnagar, Kathmandu, Nepal.</p>
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex gap-3">
                <PhoneColorSvg/>
                <div className="flex flex-col gap-2">
                  <p className="text-[15px] font-semibold">Phone</p>
                  <p className="text-[13px] leading-5">+977-9837673434 <br /> +977-9837673434</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MailColorSvg/>
                <div className="flex flex-col gap-2">
                  <p className="text-[15px] font-semibold">Email</p>
                  <p className="text-[13px] leading-5">email@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#EEEEEE] rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[#193E4D] text-lg font-medium">Feel free to reach out to us</p>
              <p className="text-[13px] text-[#6B7579] leading-7 text-wrap">
                We are just a call away if you have any queries, or you could simply visit our office for further discussions.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[#193E4D] font-medium">Follow us on</p>
              <div className="flex gap-3 text-[#4E5BA6]  ">
                {socialList.map((item) => {
                  return(
                    <a key={item.id} href={item.link} target="_blank" className="border border-[#4E5BA6] rounded-full p-[7px]">{item.icon}</a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-20">
          <div className="w-3/5 flex flex-col gap-2">
            <h1 className="text-[#193E4D] text-2xl font-medium ">
              Locate us on map
            </h1>
            <p className="text-[#858585]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet
            </p>
            <Map />
          </div>
          <div className="w-2/5">
            <div className="flex w-full flex-col gap-3 px-2 py-2">
              <h1 className="text-[#193E4D] text-2xl font-medium ">
                Contact us form
              </h1>
              <p className="text-[#858585]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet
              </p>
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
              <div className="flex items-center justify-center  py-2 border-[#4E5BA6] bg-[#4E5BA6] hover:bg-white text-white rounded-full cursor-pointer border gap-3 hover:text-[#4E5BA6]">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
