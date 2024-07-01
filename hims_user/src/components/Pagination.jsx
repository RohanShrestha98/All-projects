/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
// import "./pagination.css";

const Pagination = ({ totalPage, currentPage = 1, handlePageChange }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={false}
        nextLabel={false}
        breakLabel={"..."}
        pageCount={totalPage}
        forcePage={currentPage - 1}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
        containerClassName={"flex items-center gap-1"}
        pageClassName="bg-gray-200 cursor-pointer w-6 h-6 items-center rounded text-black border flex justify-center "
        activeClassName="bg-blue-700 text-blue-700"
      />
    </div>
  );
};

export default Pagination;
