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

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          HORIZONTAL IFRAME
        </h2>
        <iframe
          src="https://live.spago.com/shows?primaryCategory=%255B%2522shoes%2522%252C%2522wallets%2522%252C%2522skin_care%2522%252C%2522other%2522%255D&subCategory=%255B%2522heels%2522%252C%2522ballet_flats%2522%252C%2522sneakers%2522%252C%2522espadrilles%2522%252C%2522boots%2522%252C%2522loafers%2522%252C%2522slippers%2522%252C%2522slingback%2522%252C%2522mary_janes%2522%252C%2522large_wallets%2522%252C%2522wristlets%2522%252C%2522cardholders%2522%252C%2522self_tanning%2522%252C%2522cleaners_and_exfoliators%2522%252C%2522hair_removal%2522%252C%2522bath_and_shower%2522%252C%2522lip_care%2522%252C%2522skin_care_tools%2522%255D&status=%255B%2522scheduled%2522%252C%2522live%2522%252C%2522ended%2522%252C%2522cancelled%2522%255D"
          width="100%"
          height="530"
          title="Widget Preview"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          RESPONSIVE IFRAME
        </h2>
        <iframe
          src="https://live.spago.com/embed/widget?widgetId=c85e5236-e0ea-4714-835b-bf8199b7bf92&primaryCategory=%255B%2522shoes%2522%252C%2522wallets%2522%252C%2522skin_care%2522%252C%2522other%2522%255D&subCategory=%255B%2522heels%2522%252C%2522ballet_flats%2522%252C%2522sneakers%2522%252C%2522espadrilles%2522%252C%2522boots%2522%252C%2522loafers%2522%252C%2522slippers%2522%252C%2522slingback%2522%252C%2522mary_janes%2522%252C%2522large_wallets%2522%252C%2522wristlets%2522%252C%2522cardholders%2522%252C%2522self_tanning%2522%252C%2522cleaners_and_exfoliators%2522%252C%2522hair_removal%2522%252C%2522bath_and_shower%2522%252C%2522lip_care%2522%252C%2522skin_care_tools%2522%255D&status=%255B%2522scheduled%2522%252C%2522live%2522%252C%2522ended%2522%252C%2522cancelled%2522%255D"
          width="100%"
          height="530"
          title="Widget Preview"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
