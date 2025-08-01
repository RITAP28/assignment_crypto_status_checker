import { ICoinsProps } from "@/lib/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import PaginationButtons from "./paginationButtons";

interface IMarketTableProps {
  allCoins: ICoinsProps[];
}

const MarketTable: React.FC<IMarketTableProps> = ({ allCoins }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div className="w-full py-[4rem] flex justify-center">
      <div className="w-[80%] flex flex-col px-4">
        <div className="w-full flex flex-row justify-between">
          <div className="font-bold py-2 text-xl text-teal-500">
            Coins Market List
          </div>
          <PaginationButtons />
        </div>

        <table className="w-full border border-zinc-400 text-sm text-zinc-800">
          <thead className="bg-teal-400 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 text-center">Rank</th>
              <th className="px-4 py-2 text-left">Icon</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">24h %</th>
              <th className="px-4 py-2 text-right">Market Cap</th>
              <th className="px-4 py-2 text-right">Total Volume</th>
            </tr>
          </thead>
          <tbody>
            {allCoins.slice(0, 50).map((coin) => (
              <tr
                key={coin.id}
                className="border-t border-zinc-200 hover:bg-teal-200 hover:cursor-pointer transition duration-200 ease-in-out"
              >
                <td className="px-4 py-2 text-center border-r border-zinc-300">
                  {coin.market_cap_rank}
                </td>

                <td className="px-4 py-2 border-r border-zinc-300">
                  <span className="text-gray-600">[icon]</span>
                </td>

                <td className="px-4 py-2 font-medium border-r border-zinc-300">
                  {coin.name}
                </td>

                <td className="px-4 py-2 uppercase text-gray-500 border-r border-zinc-300">
                  {coin.symbol}
                </td>

                <td className="px-4 py-2 text-right border-r border-zinc-300">
                  ${coin.current_price.toLocaleString()}
                </td>

                <td
                  className={`px-4 py-2 text-right font-medium ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } border-r border-zinc-300`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>

                <td className="px-4 py-2 text-right border-r border-zinc-300">
                  ${coin.market_cap.toLocaleString()}
                </td>

                <td className="px-4 py-2 text-right border-r border-zinc-300">
                  ${coin.total_volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
