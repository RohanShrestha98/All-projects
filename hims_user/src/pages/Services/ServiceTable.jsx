/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useHospitalServiceMutation } from "../../hooks/useMutateData";
import { useHospitalServicesDataList } from "../../hooks/useQueryData";
// import { ROLES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { ReactTable } from "../../components/Table";
import { FiEye } from "react-icons/fi";
// import { useAuthContext } from "../../context/authContext";

const columnHelper = createColumnHelper();

export default function ServiceTable({ debouncedSearch }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const { data, isLoading, isError } = useHospitalServicesDataList({
    search: debouncedSearch,
    page: page,
    pageSize: pageSize,
  });

  const [ServiceData, setServiceData] = useState([]);

  const deleteMutation = useHospitalServiceMutation();
  // const { auth } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const tableData = data.map((service) => ({
        id: service.id,
        idx: service.idx,
        department: service.title,
        sub_departments: service.sub_departments,
      }));
      setServiceData(tableData);
    }
  }, [data]);

  const totalEntries = data?.total;

  const columns = useMemo(
    () => [
      columnHelper.accessor("department", {
        header: "Department",
      }),
      columnHelper.display({
        id: "actions",
        header: "Services",
        cell: ({ row }) => (
          <div
            onClick={() => navigate("preview", { state: row?.original })}
            className="flex items-start gap-4"
          >
            <div className="cursor-pointer  text-primary">
              <FiEye className="h-6 w-6 p-1 rounded-lg border border-primary" />
            </div>
          </div>
        ),
      }),
    ],
    [deleteMutation, data]
  );

  // const finalColumns = [ROLES.hospitalManager].includes(
  //   auth.userDetails.roles[0]
  // )
  //   ? columns.filter((column) => column.id !== "actions")
  //   : columns;

  return (
    <>
      <ReactTable
        data={ServiceData}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        totalEntries={totalEntries}
        showFooter
        // containsActions={[ROLES.hospitalAdmin].includes(
        //   auth.userDetails.roles[0]
        // )}
        className="h-[calc(100vh-232px)]"
        pageSizeChangeHandler={(size) => setPageSize(size)}
        pageChangeHandler={(page) => setPage(page)}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  );
}
