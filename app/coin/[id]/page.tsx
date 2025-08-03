"use client";

import React, { useEffect, useState } from "react";
import { ICoinDataProps } from "@/lib/interfaces";
import axios from "axios";
import LoadingDots from "@/lib/loadingDots";
import { useParams } from "next/navigation";
import IndividualCoinHeader from "@/components/coin/header";
import PriceChart from "@/components/coin/priceChart";

export default function Page() {
  const params = useParams();
  const [coin, setCoin] = useState<ICoinDataProps | null>(null);
  const [chartDataLoading, setChartDataLoading] = useState<boolean>(false);
  const [chartDataError, setChartDataError] = useState<string | null>(null);

  const [activeChart, setActiveChart] = useState<"1d" | "7d" | "30d" | "90d">(
    "1d"
  );
  const chartDaysMap = {
    "1d": 1,
    "7d": 7,
    "30d": 30,
    "90d": 90,
  };

  // chart data state
  // response data: { prices: {[1754071913341, 114244.25155508265], [1754071913341, 114244.25155508265], more...}, market_caps: {[1754071913341, 114244.25155508265], [1754071913341, 114244.25155508265], more...}, total_volumes: {[1754071913341, 114244.25155508265], [1754071913341, 114244.25155508265], more...} }
  const [chartData, setChartData] = useState<
    { date: string; price: number }[] | null
  >(null);

  function getUnixRange(days: number): { from: number; to: number } {
    const now = Math.floor(Date.now() / 1000);
    const secondsInDay = 86400;
    const from = now - days * secondsInDay;
    return { from, to: now };
  }

  const fetchChart = async () => {
    try {
      setChartDataLoading(true);
      setChartDataError(null);

      const days = chartDaysMap[activeChart]; // 1, 7, 30, or 90
      const { from, to } = getUnixRange(days);

      const res = await axios.get(`/api/coin/${params.id}`, {
        params: {
          vs_currency: "usd",
          from: from,
          to: to,
        },
      });
      console.log("response data: ", res.data);

      if (res.data.prices) {
        // Format for recharts: [{ date, price }]
        const pricesFormatted = res.data?.prices.map((entry: number[]) => ({
          date: new Date(entry[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: entry[1],
        }));

        setChartData(pricesFormatted);
      }
    } catch (error) {
      console.error("Error while obtaining chart data: ", error);
      setChartDataError("Something went wrong");
    } finally {
      setChartDataLoading(false);
    }
  };

  const fetchCoin = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${params.id}`,
      {
        headers: {
          Accept: "application/json",
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    setCoin(res.data);
  };

  useEffect(() => {
    fetchCoin();
  }, [params.id]);

  useEffect(() => {
    fetchChart();
  }, [params.id, activeChart]);

  if (!coin)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="flex flex-row gap-2">
          <span className="font-semibold">Loading your coin data</span>
          <LoadingDots />
        </p>
      </div>
    );

  const market = coin.market_data;

  return (
    <div className="w-full h-screen bg-zinc-800 p-1">
      <div className="w-full h-full rounded-lg bg-zinc-700 overflow-y-auto">
        <div className="p-6 max-w-5xl mx-auto space-y-6">
          <IndividualCoinHeader coin={coin} market={market} />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">Rank</span>{" "}
              <span className="font-semibold text-teal-500 text-xl">
                {coin.market_cap_rank}
              </span>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">Price</span>{" "}
              <span className="font-semibold text-teal-500 text-xl">
                ${market.current_price.usd.toLocaleString()}
              </span>
            </div>
            <div className="bg-zinc-600 px-2 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">Market Cap</span>
              <span className="font-semibold text-teal-500 md:text-xl">
                ${market.market_cap_change_24h.toLocaleString()}
              </span>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">24h Volume</span>
              <span className="font-semibold text-teal-500 md:text-xl">
                ${market.total_volume.usd.toLocaleString()}
              </span>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">
                Circulating Supply
              </span>{" "}
              <div className="w-full flex flex-row justify-between items-center">
                <span className="font-semibold text-teal-500 md:text-xl">
                  {market.circulating_supply?.toLocaleString()}{" "}
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">
                Total Supply
              </span>{" "}
              <span className="font-semibold text-teal-500 md:text-xl">
                {market.total_supply?.toLocaleString()}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </div>

          {/* chart of the price of the coin */}
          <PriceChart activeChart={activeChart} setActiveChart={setActiveChart} chartDataLoading={chartDataLoading} chartDataError={chartDataError} chartData={chartData} />

          {/* description of the coin */}
          <div className="bg-zinc-600 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Description
            </h2>
            <p
              className="text-zinc-300 text-sm"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
