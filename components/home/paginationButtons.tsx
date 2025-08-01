import React from "react";

const PaginationButtons = () => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <button
        type="button"
        className="text-sm font-bold text-white px-2 py-0.5 bg-teal-500 hover:cursor-pointer hover:bg-teal-400 transition duration-200 ease-in-out rounded-sm"
      >
        Prev
      </button>
      <span className="px-1 font-semibold">1</span>
      <button
        type="button"
        className="text-sm font-bold text-white px-2 py-0.5 bg-teal-500 hover:cursor-pointer hover:bg-teal-400 transition duration-200 ease-in-out rounded-sm"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
