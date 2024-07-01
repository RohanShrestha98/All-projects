import { useForm } from "react-hook-form";
import Button from "../../myComponents/Button";
import InputField from "../../myComponents/InputField";
import TextArea from "../../myComponents/TextArea";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactSelect from "../../myComponents/Select";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const location = useLocation();
  const updateData = location?.state?.data;
  const { register, watch, control, handleSubmit } = useForm(
    updateData && {
      defaultValues: {
        chipset: updateData?.chipset,
        marked_price: updateData?.marked_price,
        display: updateData?.display,
        cpu: updateData?.cpu,
        discount_percentage: updateData?.discount_percentage,
        product_category: updateData?.product_category,
        product_name: updateData?.product_name,
        product_description: updateData?.product_description,
        vat_percentage: updateData?.vat_percentage,
      },
    }
  );
  const myUUID = uuidv4();
  const [images, setImages] = useState();
  const [featureField, setFeatureField] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState();

  const uploadFiles = async () => {
    const downloadUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `/productImages/${images[i].name}`);

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

  const handleImageRemove = (key) => {
    const updatedFileList = { ...images };
    delete updatedFileList[key];
    setImages(updatedFileList);
  };

  const fileList =
    Object &&
    Object?.keys(images !== undefined && images)
      .filter((key) => !isNaN(parseInt(key)))
      .map((key) => {
        const file = images !== undefined && images[key];
        const imageUrl = URL.createObjectURL(file);
        return (
          <div key={key}>
            <img
              src={imageUrl}
              alt={file.name}
              className="w-full object-fill"
            />
            <div
              className="cursor-pointer"
              onClick={() => handleImageRemove(key)}
            >
              +
            </div>
          </div>
        );
      });

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "category"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const categoryOption = data?.map((item) => {
    return {
      value: item?.id,
      label: item?.category_name,
    };
  });
  const productCategory = watch("product_category");

  const handleDyanmicFeatureField = async () => {
    const q = query(
      collection(db, "category"),
      where("id", "==", productCategory?.value)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFeatureField(doc.data()?.category_inputfield);
    });
  };

  useEffect(() => {
    handleDyanmicFeatureField();
  }, [productCategory]);

  const handleAdd = async (data, uuid) => {
    console.log("data", data);
    try {
      const imageUrls = await uploadFiles();
      await setDoc(doc(db, "product", uuid), {
        ...data,
        id: uuid,
        createdDate: serverTimestamp(),
        images: imageUrls,
      });
      console.log("User data and images added successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error adding user data:", err);
    }
  };

  const handleUpdate = async (data) => {
    console.log("data", data);
    try {
      await updateDoc(doc(db, "product", updateData?.id), {
        ...data,
        updateDate: serverTimestamp(),
      });
      navigate("/product");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="p-4 bg-slate-50">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Add Product </p>
      </div>
      <form
        onSubmit={handleSubmit(
          updateData ? (e) => handleUpdate(e) : (e) => handleAdd(e, myUUID)
        )}
      >
        <div className="flex flex-grow gap-4 mt-4">
          <div className="w-3/4 flex flex-col gap-6">
            <div className="border bg-white w-full  rounded-lg p-4">
              <h1 className="font-medium text-xl mb-2">General Information</h1>
              <InputField
                placeholder={"Enter the product name"}
                registerName={"product_name"}
                label={"Product Name"}
                type={"text"}
                classes={"bg-[#f9f9fcff] h-10 border"}
                register={register}
              />
              <TextArea
                className={"mt-4"}
                placeholder={"Enter the product description here ..."}
                registerName={"product_description"}
                label={"Product Description"}
                type={"textarea"}
                classes={"bg-[#f9f9fcff] h-32 border"}
                register={register}
              />
            </div>
            <div className="border bg-white w-full  rounded-lg p-4">
              <h1 className="font-medium text-xl mb-2">Images</h1>
              <p className="mb-2">Photo</p>
              <div className="flex flex-col items-center border border-dashed p-12 rounded-md">
                <div className=" flex gap-3 mb-4">
                  {images &&
                    fileList?.map((item) => {
                      return (
                        <div
                          className="w-28 flex flex-col items-center justify-center border bg-gray-50 border-gray-500 rounded-md overflow-hidden"
                          key={item}
                        >
                          <div> {item}</div>
                        </div>
                      );
                    })}
                </div>
                {!images && (
                  <p className="mb-2 text-sm ">
                    You can select multiple images here
                  </p>
                )}
                {!images && (
                  <>
                    <label
                      htmlFor="images"
                      className="cursor-pointer border bg-gray-50 px-4 py-1 rounded-md"
                    >
                      Add Images
                    </label>
                    <input
                      id="images"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(event) => {
                        setImages(event.target.files);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="border bg-white w-full  rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h1 className="font-medium text-xl mb-2">Product Features</h1>
              </div>
              {!featureField ? (
                <div className="py-16 flex justify-center">
                  Choose the category on the top right
                </div>
              ) : (
                <div className="flex flex-wrap gap-[2%]">
                  {featureField?.map((item) => {
                    return (
                      <InputField
                        key={item}
                        className={" w-[49%] mt-3"}
                        placeholder={`Enter the ${item} name`}
                        registerName={item.toLowerCase()}
                        label={item}
                        type={"text"}
                        classes={"bg-[#f9f9fcff] h-10 border"}
                        register={register}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-6">
            <div className="border bg-white w-full rounded-lg px-4 pb-6 pt-4">
              <h1 className="font-medium text-xl mb-2">Category</h1>
              <ReactSelect
                options={categoryOption}
                title={"Product Category"}
                control={control}
                registerName={"product_category"}
              />
            </div>
            <div className="border bg-white w-full rounded-lg px-4 pb-6 pt-4">
              <h1 className="font-medium text-xl mb-2">Pricing</h1>
              <InputField
                className={" w-full "}
                placeholder={"Enter the marked price"}
                registerName={"marked_price"}
                label={"Marked Price"}
                type={"number"}
                classes={"bg-[#f9f9fcff] h-10 border"}
                register={register}
              />
              <InputField
                className={" w-full mt-4 "}
                placeholder={"Enter the discount percentage"}
                registerName={"discount_percentage"}
                label={"Discount Percentage"}
                type={"number"}
                classes={"bg-[#f9f9fcff] h-10 border"}
                register={register}
              />
              <InputField
                className={" w-full mt-4 "}
                placeholder={"Enter the VAT percentage"}
                registerName={"vat_percentage"}
                label={"VAT Percentage"}
                type={"number"}
                classes={"bg-[#f9f9fcff] h-10 border"}
                register={register}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end my-6">
          <div className=" w-52 ">
            <Button title={updateData ? "Update Product" : "Add Product"} />
          </div>
        </div>
      </form>
    </div>
  );
}
