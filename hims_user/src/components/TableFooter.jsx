/* eslint-disable react/prop-types */
// import Select from "../UI/Select";
import Pagination from "./Pagination";

export default function TableFooter({
  totalEntries,
  pageSize,
  pageSizeChangeHandler,
  pageChangeHandler,
  currentPage = 1,
}) {
  const totalPageCount = Math.ceil(totalEntries / pageSize);

  return (
    <div className="flex items-center justify-between pt-4 text-sm font-medium">
      <span className="text-grayText">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(pageSize * currentPage, totalEntries)} of {totalEntries}{" "}
        Entries
      </span>
      <Pagination
        totalPageCount={totalPageCount}
        pageChangeHandler={pageChangeHandler}
        currentPage={currentPage}
      />
      <div className="flex items-center gap-4">
        <span className="text-grayText">Items per page</span>
        {/* <Select
          options={["7", "10", "20", "30", "40", "50"]}
          value={pageSize.toString()}
          onValueChange={(value) => pageSizeChangeHandler(Number(value))}
          triggerClassName="py-0.5 text-sm"
        /> */}
      </div>
    </div>
  );
}
