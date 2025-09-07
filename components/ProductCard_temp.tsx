"use client";
import { memo } from "react";
import { Product } from "@/types/products";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  console.log("render PRODUCT CARD");
  return (
    <Link href={`/products/${product.id}`}>
      <div
        key={product.id}
        className="relative h-64 rounded-lg overflow-hidden shadow-lg group"
      >
        {/* Background Image with Zoom on Hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.thumbnail})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
          {product.category}
        </div>

        {/* Text Content */}
        <div className="absolute bottom-0 p-4 text-white z-10">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-blue-200 font-bold mt-1">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
