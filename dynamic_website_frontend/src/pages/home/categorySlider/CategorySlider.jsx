import CategorySideBar from "./category/CategorySidebar";
import slider1 from "../../../assets/slider1.png";

export default function CategorySlider() {
  const description = [
    {
      id: 1,
      description: "Get US $10 off with a new supplier",
      color: "bg-green-600 ",
    },
    {
      id: 2,
      description: "Get US $10 off with a new supplier",
      color: "bg-orange-500",
    },
    {
      id: 3,
      description: "Get US $10 off with a new supplier",
      color: "bg-blue-400 ",
    },
  ];
  return (
    <div className="flex justify-between gap-4 bg-white">
      <CategorySideBar />
      <div className="w-[50%] h-96  py-6">
        <img className="w-full h-full object-cover" src={slider1} alt="" />
      </div>
      <div className="w-[22%] h-96 flex flex-col gap-3  py-6 pr-4 ">
        {description?.map((item) => {
          return (
            <div
              key={item.id}
              className={` px-4 py-6 rounded-lg ${item.color} text-white`}
            >
              <p className="font-lg font-semibold">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
