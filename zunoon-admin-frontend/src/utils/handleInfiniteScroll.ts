import { Dispatch, SetStateAction } from "react";

export const handleInfiniteScroll = (
  totalPage: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
) => {
  if (totalPage > currentPage) {
    setCurrentPage(prevPage => prevPage + 1);
  }
};
