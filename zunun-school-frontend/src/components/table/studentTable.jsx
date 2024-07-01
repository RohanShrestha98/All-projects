import React from "react";
import { ReactTable } from "./table";

const StudentTable = ({
  data,
  currentPage,
  totalPage,
  isFetching,
  columns,
  rowSelectable,
  setSelectedRows,
  tableRef,
  error,
  handlePageChange,
}) => {
  return (
    <>
      <ReactTable
        loading={isFetching}
        columns={columns}
        data={data ?? []}
        currentPage={currentPage}
        totalPage={totalPage}
        setSelectedRows={setSelectedRows}
        rowSelectable={rowSelectable}
        ref={tableRef}
        error={error}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default StudentTable;
