// components/CoinTable.tsx
"use client";
import Image from "next/image";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

interface CoinTableProps {
  activeFilter?: "price" | "24h%" | "market_cap" | "total_volume" | null;
  coins: Coin[];
  onRowClick?: (coinId: string) => void;
}

export default function CoinTable({
  activeFilter,
  coins,
  onRowClick,
}: CoinTableProps) {
  const filteredCoins = [...coins];

  if (activeFilter === "price") {
    filteredCoins.sort((a, b) => b.current_price - a.current_price);
  } else if (activeFilter === "24h%") {
    filteredCoins.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
  } else if (activeFilter === "market_cap") {
    filteredCoins.sort((a, b) => b.market_cap - a.market_cap);
  } else if (activeFilter === "total_volume") {
    filteredCoins.sort((a, b) => b.total_volume - a.total_volume);
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border border-zinc-300">
      <table className="w-full text-sm text-zinc-800">
        <thead className="bg-teal-400 text-gray-700 font-semibold">
          <tr>
            <th className="px-2 sm:px-4 py-2 text-center">Rank</th>
            <th className="px-2 sm:px-4 py-2 text-left">Icon</th>
            <th className="px-2 sm:px-4 py-2 text-left">Name</th>
            <th className="px-2 sm:px-4 py-2 text-left">Symbol</th>
            <th className="px-2 sm:px-4 py-2 text-right">Price</th>
            <th className="px-2 sm:px-4 py-2 text-right">24h %</th>
            <th className="px-2 sm:px-4 py-2 text-right">Market Cap</th>
            <th className="px-2 sm:px-4 py-2 text-right">Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr
              key={coin.id}
              className="border-t border-zinc-200 hover:bg-teal-200 hover:cursor-pointer transition duration-200 ease-in-out"
              onClick={() => onRowClick?.(coin.id)}
            >
              <td className="px-2 sm:px-4 py-2 text-center border-r border-zinc-300">
                {coin.market_cap_rank}
              </td>
              <td className="px-2 sm:px-4 py-2 border-r border-zinc-300">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={24}
                  height={24}
                />
              </td>
              <td className="px-2 sm:px-4 py-2 font-medium border-r border-zinc-300">
                {coin.name}
              </td>
              <td className="px-2 sm:px-4 py-2 uppercase text-gray-500 border-r border-zinc-300">
                {coin.symbol}
              </td>
              <td className="px-2 sm:px-4 py-2 text-right border-r border-zinc-300">
                ${coin.current_price.toLocaleString()}
              </td>
              <td
                className={`px-2 sm:px-4 py-2 text-right font-medium ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                } border-r border-zinc-300`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="px-2 sm:px-4 py-2 text-right border-r border-zinc-300">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td className="px-2 sm:px-4 py-2 text-right border-r border-zinc-300">
                ${coin.total_volume.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
