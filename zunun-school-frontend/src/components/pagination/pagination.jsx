import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const Pagination = ({ totalPage, currentPage = 1, handlePageChange }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={totalPage}
        forcePage={currentPage - 1}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
        containerClassName={"pagination"}
        previousLinkClassName={"prev_link"}
        nextLinkClassName={"next__link"}
        disabledClassName={"disable__link"}
        activeClassName={"active_link"}
      />
    </div>
  );
};

export default Pagination;
