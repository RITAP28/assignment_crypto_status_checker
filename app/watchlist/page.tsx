"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CoinTable from "@/components/common/coinsTable";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [coins, setCoins] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (watchlist.length === 0) return setCoins([]);

      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: { vs_currency: "usd", ids: watchlist.join(",") },
        }
      );
      setCoins(res.data);
    };

    fetchData();
  }, [watchlist]);

  return (
    <div className="w-full h-screen bg-teal-800 p-1">
      <div className="w-full h-full rounded-md bg-teal-100 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-teal-600">Watchlist</h1>
          <p className="pb-2 text-teal-500 font-semibold">
            You can view your saved coins here
          </p>
          {coins.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold">No coins to view</p>
            </div>
          ) : (
            <CoinTable
              coins={coins}
              onRowClick={(id) => router.push(`/coin/${id}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
