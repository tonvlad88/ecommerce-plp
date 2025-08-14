"use client";

import Loading from "@/components/loading";
import ProductCard from "@/components/productCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
