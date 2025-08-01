/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MarketTable from "@/components/home/marketTable";
import Navbar from "@/components/home/navbar";
import { ICoinsProps } from "@/lib/interfaces";
import LoadingDots from "@/lib/loadingDots";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCoinsLoading, setAllCoinsLoading] = useState<boolean>(false);
  const [allCoinsError, setAllCoinsError] = useState<string | null>(null);
  const [allCoins, setAllCoins] = useState<ICoinsProps[]>([]);

  const handleGetAllCoinsData = async () => {
    try {
      console.log("getting all the coins data from the market");
      setAllCoinsLoading(true);
      setAllCoinsError(null);

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
        {
          headers: {
            Accept: "application/json",
            "x-cg-demo-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      if (response.status === 200) {
        console.log("response for all coins in the market: ", response.data);
        setAllCoins(response.data);
      }
    } catch (error: any) {
      setAllCoinsError(error?.response?.data?.error);
    } finally {
      setAllCoinsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllCoinsData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-teal-100">
      {/* navbar */}
      <Navbar />

      {/* coin market data */}
      {allCoinsLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="pr-1">Bringing the data to you</p>
          <LoadingDots />
        </div>
      ) : allCoinsError ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <p className="font-semibold text-red-500">Error</p>
        </div>
      ) : (
        <MarketTable allCoins={allCoins} />
      )}

      
    </div>
  );
}
