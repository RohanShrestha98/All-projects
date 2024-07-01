import ReactPaginate from "react-paginate";
import "./Pagination.scss";

type PropsType = {
  handlePageChange: Function;
  totalPageNumber: number;
  currentPageNumber?: number;
  onZero?: undefined;
};

export default function Pagination({
  handlePageChange,
  totalPageNumber,
  currentPageNumber = 1,
  onZero = undefined,
}: PropsType) {
  return (
    <>
      <ReactPaginate
        pageCount={totalPageNumber}
        forcePage={currentPageNumber - 1}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        containerClassName="pagination_container"
        pageLinkClassName="page-num"
        activeLinkClassName={currentPageNumber ? "active" : ""}
        breakLinkClassName=""
        nextLinkClassName="page-num"
        previousLinkClassName="page-num"
        disabledLinkClassName="pointer-events-none text-grayDisabled"
      />
    </>
  );
}
