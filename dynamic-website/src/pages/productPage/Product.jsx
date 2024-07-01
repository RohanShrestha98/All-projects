/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebaseConfig";
import Table from "../../myComponents/table";
import { Link } from "react-router-dom";

export default function Product() {
  const [data, setData] = useState();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "product"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "product", id));
  };

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
        id: "image",
        header: () => <>Thumbnail</>,
        cell: ({ row }) => (
          <div className="flex gap-4">
            <img
              className="h-14 rounded-xl"
              src={row.original.images[0]}
              alt=""
            />
          </div>
        ),
      },
      {
        accessorFn: (row) => {
          return row?.product_name;
        },

        id: "title",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.marked_price,
        id: "marked_price",
        cell: (info) => info.getValue(),
        header: () => <span>Marked Price</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: () => <>Actions</>,
        cell: ({ row }) => (
          <div className="flex  gap-4">
            <Link
              to="/add-product"
              state={{ data: row.original }}
              className="cursor-pointer"
            >
              Edit
            </Link>
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
  return (
    <div className="p-4">
      <Table data={data || []} columns={columns} />
    </div>
  );
}
