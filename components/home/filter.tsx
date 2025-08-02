import { ListFilter } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Filter = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <button
            type="button"
            className="px-4 text-sm py-1 rounded-sm bg-teal-500 font-bold text-white flex flex-row items-center gap-2 hover:cursor-pointer hover:bg-teal-600 transition duration-200 ease-in-out"
          >
            <ListFilter className="w-5 h-5" />
            <span className="">Filters</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="ml-40 bg-teal-200 border-none text-sm">
            {/* there will be four parameters upon which the table can be filtered */}
            {/* price, 24h %, market cap, total volume */}
            {/* any parameter will be active at any given moment */}
            <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-row justify-between">
                    <p className="">Price</p>
                    <button type="button" className="px-2 py-0.5 rounded-sm bg-teal-400 hover:cursor-pointer hover:bg-teal-500 transition duration-200 ease-in-out">Apply</button>
                </div>
                <div className="w-full flex flex-row justify-between">
                    <p className="">24h %</p>
                    <button type="button" className="px-2 py-0.5 rounded-sm bg-teal-400 hover:cursor-pointer hover:bg-teal-500 transition duration-200 ease-in-out">Apply</button>
                </div>
                <div className="w-full flex flex-row justify-between">
                    <p className="">Market Cap</p>
                    <button type="button" className="px-2 py-0.5 rounded-sm bg-teal-400 hover:cursor-pointer hover:bg-teal-500 transition duration-200 ease-in-out">Apply</button>
                </div>
                <div className="w-full flex flex-row justify-between">
                    <p className="">Total Volume</p>
                    <button type="button" className="px-2 py-0.5 rounded-sm bg-teal-400 hover:cursor-pointer hover:bg-teal-500 transition duration-200 ease-in-out">Apply</button>
                </div>
                <div className="w-full flex flex-row justify-between pt-4">
                    <p className="">Remove applied filters</p>
                    <button type="button" className="px-2 py-0.5 rounded-sm bg-teal-400 hover:cursor-pointer hover:bg-teal-500 transition duration-200 ease-in-out">Reset</button>
                </div>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter;
