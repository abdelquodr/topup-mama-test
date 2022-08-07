import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}
const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage
}) => {

  return (
    <div className="">
      <button
        className=""
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      > Prev </button>

      <span className="">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className=""
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
      > Next</button>
    </div>
  );
};


export default Pagination
