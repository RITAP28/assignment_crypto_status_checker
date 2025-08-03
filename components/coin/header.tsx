import { ICoinDataProps, IMarketDataProps } from "@/lib/interfaces";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import Watchlist from "./watchlist";

const IndividualCoinHeader = ({ coin, market } : { coin: ICoinDataProps, market: IMarketDataProps }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2 items-center justify-between">
      <div className="flex flex-row gap-2">
        <div className="">
          <Image
            alt=""
            src={coin.image.large}
            className=""
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <h1 className="text-3xl font-bold text-teal-400">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl font-bold text-white">
              ${market.current_price.usd.toLocaleString()}
            </p>
            <button
              type="button"
              className={`flex flex-row gap-2 px-2 py-0.5 rounded-2xl ${
                market.market_cap_change_percentage_24h > 0
                  ? "bg-teal-400"
                  : "bg-red-400"
              }`}
            >
              {market.market_cap_change_percentage_24h > 0 ? (
                <TrendingUp className="text-white" />
              ) : (
                <TrendingDown className="text-white" />
              )}
              <span className="text-white font-bold">
                {market.market_cap_change_percentage_24h} %
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <Watchlist coin={coin} />
      </div>
    </div>
  );
};

export default IndividualCoinHeader;
