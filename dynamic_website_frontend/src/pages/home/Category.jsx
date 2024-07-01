import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function Category() {
  const [data, setData] = useState();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "category"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);
  return (
    <div className="flex items-center justify-between px-28">
      {data?.slice(0, 6)?.map((item) => {
        return (
          <div key={item.id} className="flex-1/6">
            <img
              src={item?.images?.[0]}
              className="w-36 h-36 object-cover rounded-xl"
              alt={item.category_description}
            />
            <p className="font-medium">{item.category_name}</p>
          </div>
        );
      })}
    </div>
  );
}
