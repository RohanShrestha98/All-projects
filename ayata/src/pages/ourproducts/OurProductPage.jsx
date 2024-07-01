import ProductDescription from "../../components/ProductDescription";
import SummeryPart from "../../components/SummeryPart";
import NumbersAchieved from "../aboutUs/NumbersAchieved";
import KeyWords from "./KeyWords";
import Medicord from "./Medicord";
import ProductPicutres from "./ProductPicutres";

import Solution from "./Solution";
import product4 from "../../assets/product4.png";
import LetsCollaborate from "../clients/LetsCollaborate";
import LetsCollaborateComp from "../../components/LetsCollaborateComp";


export default function OurProductPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-3">
      <Solution />
      <SummeryPart
        title1={"Avyaas"}
        message={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum"
        }
      />
      <KeyWords/>
      <ProductPicutres/>
      <NumbersAchieved/>
      <ProductDescription isImage image={product4}/>
      <Medicord/>
      <div className=" flex justify-center py-20">
        <p className="text-[#667085] leading-10 w-[50%] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum libero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdumlibero et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum
        </p>
      </div>
      <LetsCollaborateComp className={"pb-20"}/>
    </div>
  );
}
