"use client"

import { useWatchlist } from "@/context/WatchlistContext";
import { ICoinDataProps } from "@/lib/interfaces";
import React from "react";
import { toast } from "sonner";

const Watchlist = ({ coin }: { coin: ICoinDataProps }) => {
  const { watchlist, toggleCoin } = useWatchlist();
  const isSaved = watchlist.includes(coin.id);

  return (
    <button
      type="button"
      className={`px-4 py-1 rounded-md hover:cursor-pointer ${isSaved ? "bg-teal-500 hover:bg-teal-600 text-white" : "bg-zinc-500 text-white hover:bg-zinc-600"} transition duration-200 ease-in-out font-bold`}
      onClick={() => {
        toggleCoin(coin.id);
        if (isSaved) {
            toast("Coin removed from watchlist");
        } else {
            toast("Coin added to watchlist");
        }
      }}
    >
      {isSaved ? "Added to Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default Watchlist;
