import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const res = await fetch(
    query
      ? `https://dummyjson.com/products/search?q=${query}`
      : "https://dummyjson.com/products"
  );

  const products = await res.json();

  return NextResponse.json(products);
}
