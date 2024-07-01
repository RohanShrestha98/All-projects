/* eslint-disable react/prop-types */
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebaseConfig";
import Table from "../../myComponents/table";

export default function Dashboard() {
  const [data, setData] = useState();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "auth"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "auth", id));
  };

  const handleUpdate = async (data) => {
    console.log("data", data);
    await updateDoc(doc(db, "auth", data.id), {
      name: "Hello",
      updateDate: serverTimestamp(),
    });
  };

  useEffect(() => {
    getData();
  }, [data]);

  // console.log("data", data);
  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: (info) => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.name,
        // console.log(row);
        id: "title",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.email,
        id: "openDate",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.role,
        id: "dueDate",
        cell: (info) => info.getValue(),
        header: () => <span>Role</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: () => <>Actions</>,
        cell: ({ row }) => (
          <div className="flex  gap-4">
            <div
              className="cursor-pointer"
              onClick={() => handleUpdate(row.original)}
            >
              Edit
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const totalDetails = [
    {
      id: 1,
      name: "Total",
      number: "2100",
      growth: "10%",
    },
    {
      id: 2,
      name: "Total",
      number: "2100",
      growth: "10%",
    },
    {
      id: 3,
      name: "Total",
      number: "2100",
      growth: "10%",
    },
    {
      id: 4,
      name: "Total",
      number: "2100",
      growth: "10%",
    },
  ];

  return (
    <div className="p-4 bg-[#f9f9fc]">
      <div className="flex gap-3 flex-grow">
        {totalDetails?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex-1 bg-white border p-4 rounded-md"
            >
              <h2>{item?.name}</h2>
              <div className="flex gap-2">
                <h1>{item?.number}</h1>
                <p>{item?.growth}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Table data={data || []} columns={columns} />
      {/* {data?.map((item) => {
        return (
          <div key={item.id} className="flex gap-4">
            {item?.images?.map((img) => {
              return <img key={img} src={img} className="w-1/4" />;
            })}
          </div>
        );
      })} */}
    </div>
  );
}
