import { ICoinsProps } from "@/lib/interfaces";
import React, { useState } from "react";
import PaginationButtons from "./paginationButtons";
import Searchbar from "./searchbar";
import Filter from "./filter";
import { useRouter } from "next/navigation";
import CoinTable from "../common/coinsTable";

interface IMarketTableProps {
  allCoins: ICoinsProps[];
}

const MarketTable: React.FC<IMarketTableProps> = ({ allCoins }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"price" | "24h%" | "market_cap" | "total_volume" | null>(null);

  const coinsToShow = currentPage === 1 ? allCoins.slice(0, 50) : allCoins.slice(51, 100);

  return (
    <div className="w-full py-[4rem] flex justify-center">
      <div className="w-full md:w-[80%] flex flex-col px-4">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="font-bold py-2 text-xl text-teal-500">
            Coins Market List
          </div>
          <Searchbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            allCoins={allCoins}
          />
        </div>

        <div className="w-full flex gap-2 justify-between items-center py-2">
          <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <PaginationButtons
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <CoinTable
          activeFilter={activeFilter}
          coins={coinsToShow}
          onRowClick={(id) => router.push(`/coin/${id}`)}
        />
      </div>
    </div>
  );
};

export default MarketTable;
