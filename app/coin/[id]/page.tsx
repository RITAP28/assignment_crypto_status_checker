"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ICoinDataProps } from "@/lib/interfaces";
import axios from "axios";
import LoadingDots from "@/lib/loadingDots";
import Image from "next/image";
import { useParams } from "next/navigation";
import { TrendingDown, TrendingUp } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Page() {
  const params = useParams();
  const [coin, setCoin] = useState<ICoinDataProps | null>(null);
  const [chartData, setChartData] = useState(null);
  const [range, setRange] = useState<string>("30");

  useEffect(() => {
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

    const fetchChart = async () => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart`,
        {
          params: { vs_currency: "usd", days: range },
          headers: {
            Accept: "application/json",
            "x-cg-demo-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      console.log("price: ", res.data);
      const prices = res.data.prices.map((p: number[]) => ({
        x: new Date(p[0]).toLocaleDateString(),
        y: p[1],
      }));
      setChartData({
        labels: prices.map((p) => p.x),
        datasets: [
          {
            label: `Price (USD)`,
            data: prices.map((p: any) => p.y),
            fill: false,
            borderColor: "#3b82f6",
            tension: 0.1,
          },
        ],
      });
    };

    fetchCoin();
    fetchChart();
  }, [params.id, range]);

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
          <div className="w-full flex flex-row gap-2">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="text-xl bg-zinc-600 px-4 py-2 rounded-md flex items-center">
              <span className="text-white font-semibold pr-1">Rank:</span>{" "}
              <span className="font-semibold text-teal-500">
                #{coin.market_cap_rank}
              </span>
            </div>
            <div className="text-lg bg-zinc-600 px-4 py-2 rounded-md flex items-center">
              <span className="text-white font-semibold pr-1">Price:</span>{" "}
              <span className="font-semibold text-teal-500">
                ${market.current_price.usd.toLocaleString()}
              </span>
            </div>
            <div className="bg-zinc-600 px-2 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">Market Cap</span>
              <span className="font-semibold text-teal-500 text-xl">
                ${market.market_cap_change_24h.toLocaleString()}
              </span>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">24h Volume</span>
              <span className="font-semibold text-teal-500 text-xl">
                ${market.total_volume.usd.toLocaleString()}
              </span>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">
                Circulating Supply
              </span>{" "}
              <div className="w-full flex flex-row justify-between items-center">
                <span className="font-semibold text-teal-500 text-xl">
                  {market.circulating_supply?.toLocaleString()}{" "}
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="bg-zinc-600 px-4 py-2 rounded-md flex flex-col items-start">
              <span className="text-white font-semibold pr-1">
                Total Supply
              </span>{" "}
              <span className="font-semibold text-teal-500 text-xl">
                {market.total_supply?.toLocaleString()}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </div>

          {/* chart of the price of the coin */}
          <div className=" bg-zinc-600 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Price Chart
            </h2>
            <div className="space-x-2 mb-4">
              {["1", "7", "30", "90"].map((d) => (
                <button
                  key={d}
                  className={`px-3 py-1 font-semibold rounded-md ${
                    range === d
                      ? "bg-teal-500 text-white"
                      : "bg-zinc-500 text-white"
                  }`}
                  onClick={() => setRange(d)}
                >
                  {d === "1" ? "24h" : `${d}d`}
                </button>
              ))}
            </div>
            {chartData ? (
              <Line data={chartData} />
            ) : (
              <p className="text-sm text-gray-400">Loading chart...</p>
            )}
          </div>

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
