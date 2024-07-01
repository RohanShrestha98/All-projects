import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function TodayDeal() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleClickedCategoryData = async (clickedCategory) => {
    const dataArray = [];
    const q = query(
      collection(db, "product"),
      where("product_category.value", "==", clickedCategory),
      where("discount_percentage", ">", "30")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    navigate("/all-products", {
      state: { data: dataArray },
    });
  };

  const getData = async () => {
    const dataArray = [];
    const q = query(
      collection(db, "product"),
      where("discount_percentage", ">", "30")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    setData(dataArray);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" border mt-8 bg-white flex">
      <div className="w-1/6">hello</div>
      {data?.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() =>
              handleClickedCategoryData(item?.product_category?.value)
            }
            className="w-1/6 border-l px-5 py-2 flex flex-col items-center justify-center"
          >
            <img src={item?.images[0]} className="w-36 h-36 m-4" alt="" />
            <p className="textx-base  font-medium  text-[#1c1c1c]">
              {item?.product_name}
            </p>
            <p className="px-4 py-1 rounded-full font-bold text-[#EB001B] mb-4 mt-2 bg-red-100">
              -{item?.discount_percentage}%
            </p>
          </div>
        );
      })}
    </div>
  );
}
