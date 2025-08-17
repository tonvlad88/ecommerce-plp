"use client";

import FilterProducts from "@/components/filterProducts";
import Loading from "@/components/loading";
import LoadingGrid from "@/components/loadingGrid";
import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchBar";
import SortProducts from "@/components/sortProduct";
import { Product } from "@/types/products";
import { Suspense, useEffect, useState } from "react";

const SORT_VALUES = {
  ASC: "Price: Low to High",
  DESC: "Price: High to Low",
};

const sortOptions = [SORT_VALUES.ASC, SORT_VALUES.DESC];

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch products when debouncedQuery changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsSearching(true);
      const res = await fetch(`/api/product?q=${debouncedQuery}`);
      const data = await res.json();
      setProducts(data.products);
      setIsSearching(false);
    };

    fetchProducts();
  }, [debouncedQuery]);

  useEffect(() => {
    let filtered = rawProducts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    filtered = [...filtered].sort((a, b) =>
      sortBy === SORT_VALUES.ASC ? a.price - b.price : b.price - a.price
    );

    setProducts(filtered);
  }, [rawProducts, selectedCategory, sortBy]);

  if (loading) {
    return <Loading />;
  }

  console.log("render render render --->>>");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛍️ Product Listing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Search */}
        <SearchBar
          debouncedQuery={debouncedQuery}
          setDebouncedQuery={(val) => setDebouncedQuery(val)}
        />

        {/* Category */}
        <FilterProducts
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => setSelectedCategory(cat)}
          categories={categories}
        />

        {/* Sort */}
        <SortProducts
          sortBy={sortBy}
          setSortBy={(sort) => setSortBy(sort)}
          sortOptions={sortOptions}
        />
      </div>

      <Suspense fallback={<LoadingGrid />}>
        {isSearching ? (
          <LoadingGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
