import { useNavigate } from "react-router-dom";
import { useProductData } from "../../hooks/useQueryData";
import { useMemo } from "react";
import { ReactTable } from "../../components/Shared/Table";
import moment from "moment";

export default function Product() {
  const navigate = useNavigate();
  const {data} = useProductData()
  const columns = useMemo(
    () => [
        {
            accessorFn: row => row?.courseID,
            id: "id",
            cell: info => {
                return (
                    <p >
                        {info?.row?.index + 1 + " ."}
                    </p>
                )
            },
            header: () => <span>SN.</span>,
            footer: props => props.column.id,
        },
        {
            accessorFn: row => row?.name,
            id: "name",
            cell: info => {
                return (
                    <div className="flex items-center gap-1">
                        {
                            info?.row?.original?.images?.[0]?.url ? <img className="h-8 w-8 object-cover rounded-full" src={info?.row?.original?.images?.[0]?.url} alt="" />
                                : <div className="min-h-8 min-w-8 rounded-full bg-gray-100"></div>
                        }
                        <p className="flex items-center gap-1 line-clamp-1">
                            {info?.row?.original?.name ?? "-"}
                        </p>
                    </div>

                )
            },
            header: () => <span>Product Name</span>,
            footer: props => props.column.id,
        },
        {
            accessorFn: row => row?.description,
            id: "duration",
            cell: info => {
                return (
                    <p className="flex items-center gap-1">
                        {info?.row?.original?.description?.slice(0, 50)}
                    </p>
                )
            },
            header: () => <span>Description</span>,
            footer: props => props.column.id,
        },
        // {
        //     accessorFn: row => row?.category,
        //     id: "category",
        //     cell: info => {
        //         const selectedCategory = categoryData?.data?.filter((item) => item?._id === info?.row?.original?.category)
        //         return (
        //             <p className="flex items-center gap-1">
        //                 {selectedCategory?.[0]?.title}
        //             </p>
        //         )
        //     },
        //     header: () => <span>Category</span>,
        //     footer: props => props.column.id,
        // },
        {
            accessorFn: row => row?.brand,
            id: "brand",
            header: () => <span>Brand</span>,
            footer: props => props.column.id,
        },
        {
            accessorFn: row => row?.price,
            id: "price",
            cell: info => {
                return (
                    <p className="flex items-center gap-1">
                        Rs {info?.row?.original?.price}
                    </p>
                )
            },
            header: () => <span>Price</span>,
            footer: props => props.column.id,
        },
        {
            accessorFn: row => row?.createdAt,
            id: "createdAt",
            cell: info => {
                return (
                    <p className="flex items-center gap-1">
                        {moment(info?.row?.original?.createdAt).format("MMM Do YYYY, h:mm:ss a")}
                    </p>
                )
            },
            header: () => <span>Publish date</span>,
            footer: props => props.column.id,
        },
        {
            accessorFn: row => row?.inStock,
            id: "inStock",
            cell: info => {
                return (
                    <p className={`w-[90px] ${info?.row?.original?.inStock ? "bg-green-500 " : "bg-red-500 "}text-center py-1 rounded-full text-white `}>
                        {info?.row?.original?.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                )
            },
            header: () => <span>Stock</span>,
            footer: props => props.column.id,
        },

    ],
    [],
);
  console.log("data",data?.data)
  return (
    <div >
      <h1>Product list</h1>
      <ReactTable data={data?.data || []} columns={columns} />
    </div>
  );
}
