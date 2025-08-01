import React from "react";

interface IPaginationBtnProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationButtons: React.FC<IPaginationBtnProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <button
        type="button"
        className="text-sm font-bold text-white px-2 py-0.5 bg-teal-500 hover:cursor-pointer hover:bg-teal-400 transition duration-200 ease-in-out rounded-sm"
        onClick={() => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }}
      >
        Prev
      </button>
      <span className="px-1 font-semibold">
        {currentPage}
      </span>
      <button
        type="button"
        className="text-sm font-bold text-white px-2 py-0.5 bg-teal-500 hover:cursor-pointer hover:bg-teal-400 transition duration-200 ease-in-out rounded-sm"
        onClick={() => {
            setCurrentPage(currentPage + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
