import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  collection,
  where,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function AllFunction() {
  const [data, setData] = useState([]);
  const handleAdd = async () => {
    await setDoc(doc(db, "cities", uuidv4()), {
      name: "eaa",
      state: "CA",
      country: "USA",
      createdDate: serverTimestamp(),
    });
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "cities", "LA"), {
      name: "Rohan Shrestha",
      state: "Kavre",
      country: "Nepal",
      updateDate: serverTimestamp(),
    });
  };

  const fetchData = async () => {
    const docRef = doc(db, "cities", "LA");
    const docSnap = await getDoc(docRef);
    console.log("docSnap", docSnap.data());
    const q = query(collection(db, "cities"), where("country", "==", "Nepal"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cities"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "cities", "OK"));
  };

  useEffect(() => {
    getData();
  }, [data]);

  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    background: background ? background : "#000000",
    color: color ? color : "#ffffff",
  };

  return (
    <div>
      <p> Add Product</p>
      <button
        className="border px-6 rounded-full py-1"
        style={style}
        onClick={() => handleAdd()}
      >
        Add Button
      </button>
      <button
        className="border px-6 rounded-full py-1"
        style={style}
        onClick={() => handleUpdate()}
      >
        Update Button
      </button>
      <button
        className="border px-6 rounded-full py-1"
        style={style}
        onClick={() => fetchData()}
      >
        Fetch Data Button
      </button>
      <button
        className="border px-6 rounded-full py-1"
        style={style}
        onClick={() => getData()}
      >
        Get Data Button
      </button>
      <button
        className="border px-6 rounded-full py-1"
        style={style}
        onClick={() => handleDelete()}
      >
        Delete Button
      </button>
      {data?.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}
