"use client";

import Loading from "@/components/loading";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const { products } = await res.json();
      setProducts(products);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛍️ Product Listing</h1>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
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
        ))}
      </div>
    </div>
  );
}
