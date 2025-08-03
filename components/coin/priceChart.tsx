import LoadingDots from "@/lib/loadingDots";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  "1d": {
    label: "1d",
    color: "var(--chart-1)",
  },
  "7d": {
    label: "7d",
    color: "var(--chart-2)",
  },
  "30d": {
    label: "30d",
    color: "var(--chart-5)",
  },
  "90d": {
    label: "90d",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface IPriceChartProps {
  activeChart: "1d" | "7d" | "30d" | "90d";
  setActiveChart: React.Dispatch<
    React.SetStateAction<"1d" | "7d" | "30d" | "90d">
  >;
  chartDataLoading: boolean;
  chartDataError: string | null;
  chartData:
    | {
        date: string;
        price: number;
      }[]
    | null;
  
}

const PriceChart: React.FC<IPriceChartProps> = ({
  activeChart,
  setActiveChart,
  chartDataLoading,
  chartDataError,
  chartData
}) => {
  return (
    <div className=" bg-zinc-600 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2 text-white">Price Chart</h2>

      <div className="w-full flex flex-row gap-2 pb-4">
        {Object.keys(chartConfig).map((key) => {
          const chart = key as keyof typeof chartConfig;
          return (
            <button
              key={chart}
              data-active={activeChart === chart}
              onClick={() => setActiveChart(chart)}
              className={`${
                activeChart === chart
                  ? "bg-teal-500 text-white"
                  : "bg-zinc-500 text-zinc-400 hover:cursor-pointer hover:bg-zinc-700 transition duration-200 ease-in-out"
              } px-4 py-1 rounded-sm font-semibold mx-1`}
            >
              {chartConfig[chart].label}
            </button>
          );
        })}
      </div>

      {chartDataLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="flex flex-row text-white">
            <span className="">Loading your chart</span>
            <LoadingDots />
          </p>
        </div>
      ) : chartDataError ? (
        <div className="w-full h-full flex justify-center items-center">
          {chartDataError}
        </div>
      ) : chartData ? (
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={30}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="price"
                  labelFormatter={(value) => `${value}`}
                />
              }
            />
            <Line
              dataKey="price"
              type="monotone"
              stroke={chartConfig[activeChart].color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      ) : (
        <p className="text-sm text-gray-400">Loading chart...</p>
      )}
    </div>
  );
};

export default PriceChart;
