/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { usePartnerCollectionData } from "../../hooks/useQueryData";
import { ReactTable } from "../../components/Table";
const columnHelper = createColumnHelper();
import loading from "../../assets/loading.webp";
import { FiEye } from "react-icons/fi";
import PartnerDetailModal from "../../modals/PartnerDetailModal";
import NoDataPage from "../../components/UI/NoDataPage";

export default function PartnerTable({ debouncedSearch }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [seeDetails, setSeeDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { data, isError, isLoading } = usePartnerCollectionData({
    search: debouncedSearch,
    page: page,
    pageSize: pageSize,
  });

  const [partnerData, setPartnerData] = useState([]);

  useEffect(() => {
    if (data) {
      const tableData = data?.results;
      setPartnerData(tableData);
    }
  }, [data]);

  const totalEntries = data?.total;

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "Title",
        cell: ({ row }) => {
          return <div>{row?.original?.form?.title}</div>;
        },
      }),
      columnHelper.accessor("partnertitle", {
        header: "Partner Title",
        cell: ({ row }) => {
          return <div>{row?.original?.form?.hospital?.title}</div>;
        },
      }),
      columnHelper.accessor("vision", {
        header: "Major Health Program Focus",
        cell: ({ row }) => {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: row?.original?.form?.hospital?.vision,
              }}
            ></div>
          );
        },
      }),
      columnHelper.accessor("mission", {
        header: "Implementation Approach",
        cell: ({ row }) => {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: row?.original?.form?.hospital?.mission,
              }}
            ></div>
          );
        },
      }),
      columnHelper.accessor("emergency", {
        header: "Contact Focal Point",
        cell: ({ row }) => {
          return <div>{row?.original?.form?.hospital?.emergency_contact}</div>;
        },
      }),
      columnHelper.accessor("emergency", {
        header: "Geographic coverage",
        cell: ({ row }) => {
          return (
            <div>{row?.original?.form?.hospital?.geographic_coverage}</div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex items-start gap-4 cursor-pointer">
              <FiEye
                size={18}
                onClick={() => {
                  setSelectedItem(row.original);
                  setSeeDetails(true);
                }}
                className="text-green-500"
              />
            </div>
          );
        },
      }),
    ],
    [data]
  );

  return (
    <>
      {isLoading && (
        <div className="h-[80vh] flex  items-center justify-center">
          <img className="w-12 h-12" src={loading} alt="" />
        </div>
      )}
      {!partnerData.length && (
        <div>
          <NoDataPage />
        </div>
      )}
      {partnerData.length && (
        <ReactTable
          data={partnerData}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          totalEntries={totalEntries}
          showFooter
          containsActions
          containsCheckbox
          className="h-[calc(100vh-232px)]"
          pageSizeChangeHandler={(size) => setPageSize(size)}
          pageChangeHandler={(page) => setPage(page)}
          pageSize={pageSize}
          currentPage={page}
        />
      )}

      {seeDetails && (
        <PartnerDetailModal
          setIsOpen={setSeeDetails}
          data={selectedItem}
          isOpen={seeDetails}
        />
      )}
    </>
  );
}
