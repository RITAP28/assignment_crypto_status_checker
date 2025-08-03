import { NextRequest, NextResponse } from "next/server";
type Params = Promise<{ id: string }>;

export async function GET(
  req: NextRequest,
  { params }: { params: Params } 
) {
  const { searchParams } = new URL(req.url);
  const vs_currency = searchParams.get("vs_currency") || "usd";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { id } = await params;

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching data", { status: 500 });
  }
}