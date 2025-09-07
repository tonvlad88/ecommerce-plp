import BackButton from "@/components/BackButton";
import BuyButton from "@/components/BuyButtonShop";

import Image from "next/image";
import { notFound } from "next/navigation";

async function fetchProductDetails(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60s
    });

    if (!res.ok) return null;

    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log("productId", productId);

  const product = await fetchProductDetails(productId);

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
          <Image
            fill={true}
            objectFit="contain"
            src={product.thumbnail}
            alt={product.title}
            className="transition-transform duration-300 hover:scale-105 h-96 w-96" // Move visual styles here
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-indigo-600 font-semibold mb-4">
            {product.category}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-bold text-blue-700">${product.price}</p>
        </div>

        <div className="mt-8">
          <BuyButton priceId="price_1S4PHv2dtCcwsNdzj0WYvygs" quantity={1} />
        </div>
      </div>
    </div>
  );
}
