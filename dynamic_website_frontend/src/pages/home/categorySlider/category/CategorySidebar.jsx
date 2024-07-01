import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";

export default function CategorySideBar() {
  const [data, setData] = useState();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "category"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[28%] pl-4 py-6  ">
      {data?.map((item) => {
        return (
          <div
            key={item.id}
            className="flex-1/6 first:bg-[#e5f1ff] first:font-semibold"
          >
            <p className="font-medium text-base p-2 text-black  rounded cursor-pointer hover:bg-gray-50">
              {item.category_name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
