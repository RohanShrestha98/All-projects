import CategorySlider from "./categorySlider/CategorySlider";
import TodayDeal from "./dealOfTheDay/TodayDeal";

export default function Home() {
  return (
    <div>
      <div className=" bg-[#f7fafc] py-4 px-28">
        <CategorySlider />
        <TodayDeal />
      </div>
    </div>
  );
}
