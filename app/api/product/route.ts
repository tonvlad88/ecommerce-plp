import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://dummyjson.com/products");
  const products = await res.json();

  return NextResponse.json(products);
}
