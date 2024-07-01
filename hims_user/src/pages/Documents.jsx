import Header from "../components/Header";
import background from "../assets/background2.svg";
import logo from "../assets/logo2.svg";

export default function Documents() {
  const guidelines = [
    {
      id: 1,
      title: "Jorem ipsum dolor sit amet, consectetur adipi",
      desc: "sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, a",
    },
    {
      id: 2,
      title: "Jorem ipsum dolor sit amet, consectetur adipi",
      desc: "sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, a",
    },
    {
      id: 3,
      title: "Jorem ipsum dolor sit amet, consectetur adipi",
      desc: "sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, a",
    },
    {
      id: 4,
      title: "Jorem ipsum dolor sit amet, consectetur adipi",
      desc: "sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, a",
    },
    {
      id: 5,
      title: "Jorem ipsum dolor sit amet, consectetur adipi",
      desc: "sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, a",
    },
  ];
  return (
    <div>
      <Header title={"Documents"} />
      <div className="w-full bg-white rounded-md px-4 py-4">
        <input
          className="border rounded-full sm:w-full bg-gray-50 w-80 px-4 outline-none h-10"
          placeholder="Search.."
        ></input>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex justify-between  md:flex-col-reverse gap-6 mt-3">
            <div className="w-2/5 lg:w-1/2 md:w-full">
              <div className="py-4 flex flex-col mt-2 gap-3 h-[70vh] md:h-full md:mt-0 md:py-0 overflow-auto no-scrollbar px-2">
                {guidelines?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex items-center gap-4 cursor-pointer rounded-md px-3 py-4 shadow-md"
                    >
                      <div className="w-32 inline-block rounded-full p-4 bg-gray-50">
                        <img src={logo} className="w-full h-full" alt="" />
                      </div>
                      <div className="">
                        <h1 className="text-[#072D4B]  font-semibold text-base line-clamp-1">
                          Jorem ipsum dolor sit amet, consectetur adipi
                        </h1>
                        <p className="line-clamp-2 text-gray-500 text-sm">
                          sit amet, consectetur adipiscing elit. Nunc vulputate
                          libero et velit interdum, a
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-3/5 lg:w-1/2 md:w-full">
              <img className="w-full" src={background} alt="" />
              <p className="text-gray-500">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.Dorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis. Class aptent taciti sociosqu
                ad litora torquent per conubia nostra, per inceptos
                himenaeos.Dorem ipsum dolor sit amet, consectetur adipiscing
                elit. Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
