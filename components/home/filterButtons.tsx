import React from "react";

interface IFilterButtonsProps {
    type: string;
    filter: "price" | "24h%" | "market_cap" | "total_volume" | null;
    activeFilter: "price" | "24h%" | "market_cap" | "total_volume" | null;
    setActiveFilter: React.Dispatch<React.SetStateAction<"price" | "24h%" | "market_cap" | "total_volume" | null>>;
}

const FilterButtons: React.FC<IFilterButtonsProps> = ({ type, filter, setActiveFilter, activeFilter }) => {
  return (
    <div className="w-full flex flex-row justify-between">
      <p className="">{type}</p>
      <button
        type="button"
        className="px-2 py-0.5 rounded-sm bg-teal-400 hover:cursor-pointer hover:bg-teal-500 transition duration-200 ease-in-out"
        onClick={() => setActiveFilter(filter)}
        disabled={activeFilter === filter}
      >
        {activeFilter === filter ? "Applied" : "Apply"}
      </button>
    </div>
  );
};

export default FilterButtons;
