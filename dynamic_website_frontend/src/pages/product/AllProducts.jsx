import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiHeart, FiStar } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

export default function AllProducts() {
  const location = useLocation();
  const [saveToWishList, setSaveToWishList] = useState(false);

  const todayDealsData = location?.state?.data;

  return (
    <div className=" bg-[#f7fafc]  py-4  px-28">
      <div></div>
      <div className="flex gap-4 ">
        <div className="w-1/5 border bg-white"></div>
        <div className="w-4/5 ">
          <div className="border bg-white flex items-center justify-between px-4 py-3 mb-3">
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-medium">
                {todayDealsData?.length} items
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GiHamburgerMenu />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {todayDealsData?.map((item) => {
              const markedPrice = parseInt(item?.marked_price);
              const discountPercentage = parseInt(item?.discount_percentage);
              const disCountedPrice = parseInt(
                markedPrice - (discountPercentage / 100) * markedPrice
              );
              return (
                <div
                  key={item.id}
                  className="w-1/4 min-w-[160px] flex flex-col gap-1 border bg-white p-4"
                >
                  <img
                    className=" w-[90%] ml-[5%] p-3 transition-transform transform scale-100 hover:scale-110 "
                    src={item?.images[0]}
                    alt=""
                  />
                  <hr />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg text-gray-800">
                        Rs {disCountedPrice}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        Rs {markedPrice}
                      </p>
                    </div>
                    <div className="p-2 border rounded-md">
                      {saveToWishList ? (
                        <FaHeart
                          className="text-red-700"
                          onClick={() => setSaveToWishList(!saveToWishList)}
                        />
                      ) : (
                        <FiHeart
                          className="text-red-700"
                          onClick={() => setSaveToWishList(!saveToWishList)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(4)
                      .fill(true)
                      .map((index) => {
                        return (
                          <FaStar key={index} className="text-yellow-400" />
                        );
                      })}
                    {Array(1)
                      .fill(true)
                      .map((index) => {
                        return (
                          <FiStar key={index} className="text-yellow-400" />
                        );
                      })}
                  </div>
                  <p className="text-gray-700 mb-2 mt1">{item?.product_name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
