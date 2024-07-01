import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db, storage } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import Button from "../../myComponents/Button";
import InputField from "../../myComponents/InputField";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function AddUser() {
  const { register, handleSubmit } = useForm();
  const myUUID = uuidv4();
  const [images, setImages] = useState();

  const uploadFiles = async () => {
    const downloadUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `/mulitpleFiles/${images[i].name}`);

      try {
        const snapshot = await uploadBytesResumable(imageRef, images[i]);
        const downloadURL = await getDownloadURL(snapshot.ref);
        downloadUrls.push(downloadURL);
        console.log("Image uploaded:", downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return downloadUrls;
  };

  const handleAdd = async (data, uuid) => {
    console.log("data", data);
    try {
      const imageUrls = await uploadFiles();
      await setDoc(doc(db, "auth", uuid), {
        ...data,
        id: uuid,
        createdDate: serverTimestamp(),
        images: imageUrls, // Include the URLs in the document
      });
      console.log("User data and images added successfully!");
    } catch (err) {
      console.log("Error adding user data:", err);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit((e) => handleAdd(e, myUUID))}
        className="flex flex-col w-2/5 gap-2"
      >
        <InputField
          type={"text"}
          registerName={"name"}
          placeholder={"Enter your name"}
          register={register}
        />
        <InputField
          type={"email"}
          registerName={"email"}
          placeholder={"Enter your email"}
          register={register}
        />
        <select className="border-blue-400 border" {...register("role")}>
          <option>Admin</option>
          <option>Staff</option>
          <option>User</option>
        </select>
        <input
          type="file"
          multiple
          onChange={(event) => {
            setImages(event.target.files);
          }}
        />
        <InputField
          type={"password"}
          registerName={"password"}
          placeholder={"Enter your password"}
          register={register}
        />
        <Button title={"Register"} className="w-2/5" />
      </form>
    </div>
  );
}
