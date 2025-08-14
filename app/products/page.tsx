"use client";

import Loading from "@/components/loading";
import ProductCard from "@/components/productCard";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";

const SORT_VALUES = {
  ASC: "Price: Low to High",
  DESC: "Price: High to Low",
};

const sortOptions = [SORT_VALUES.ASC, SORT_VALUES.DESC];

function capitalizeFirstLetter(string: string) {
  if (string.length === 0) {
    return ""; // Handle empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const data: { products: Product[] } = await res.json();
      const { products } = data;

      // Feed categories options
      const categories = Array.from(
        new Set(products.map((product: { category: any }) => product.category))
      );
      setCategories(["All", ...categories]);
      setProducts(products);
      setRawProducts(products);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(debouncedQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [debouncedQuery]);

  // Fetch products when debouncedQuery changes
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/product?q=${debouncedQuery}`);
      const data = await res.json();
      setProducts(data.products);
      setRawProducts(products);
    };

    fetchProducts();
  }, [debouncedQuery]);

  // Sort by price
  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...products].sort((a: any, b: any) =>
        sortBy === SORT_VALUES.ASC ? a.price - b.price : b.price - a.price
      );
      return sorted;
    };
    setProducts(sortProducts());
  }, [sortBy]);

  // Filter by category
  useEffect(() => {
    const filterProductsByCategory = () => {
      if (selectedCategory.toLowerCase() === "all") {
        return rawProducts;
      }

      return rawProducts.filter(
        (product: Product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    };

    setProducts(filterProductsByCategory());
  }, [selectedCategory]);

  if (loading) {
    return <Loading />;
  }

  console.log("render render render --->>>");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛍️ Product Listing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Search */}
        <div className="flex flex-col">
          <label htmlFor="search" className="text-sm font-medium mb-1">
            Search Products
          </label>
          <input
            id="search"
            type="text"
            value={debouncedQuery}
            onChange={(e) => setDebouncedQuery(e.target.value)}
            placeholder="e.g. mascara"
            className="border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat}>{capitalizeFirstLetter(cat)}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex flex-col">
          <label htmlFor="sort" className="text-sm font-medium mb-1">
            Sort by Price
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
            className="border p-2 rounded"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
