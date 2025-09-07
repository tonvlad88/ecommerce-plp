"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react"; // Import Lucide icons

interface BuyButtonProps {
  priceId: string;
  quantity: number;
}

export default function BuyButton({ priceId, quantity }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const router = useRouter();

  // New function for handling the actual checkout
  async function proceedToCheckout() {
    setLoading(true);
    setIsModalOpen(false); // Close the modal
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: priceId, quantity: quantity }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url); // Use router.push for client-side navigation
      } else {
        alert("Could not start checkout.");
      }
    } catch (e) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // Handle the initial button click to show the modal
  function handleBuyClick() {
    setIsModalOpen(true);
  }

  return (
    <>
      <button
        onClick={handleBuyClick}
        disabled={loading}
        className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 text-center shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center">
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                This is a Test Purchase
              </h2>

              <p className="mt-2 text-lg text-gray-700">
                Please use the following test payment details to complete your
                transaction:
              </p>

              <table className="mt-4 w-full max-w-md border border-gray-300 text-left text-gray-800">
                <tbody>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-semibold">Email</th>
                    <td className="px-4 py-2">test@test.com</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-semibold">Card Info</th>
                    <td className="px-4 py-2">4111 1111 1111 1111</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-semibold">Month/Year</th>
                    <td className="px-4 py-2">06/26</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 font-semibold">CCV</th>
                    <td className="px-4 py-2">123</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 font-semibold">Country</th>
                    <td className="px-4 py-2">Philippines</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-2 text-sm text-gray-500 italic">
                Note: Any image, product name, or price shown on the PayPal
                payment portal is a dummy placeholder for testing purposes only.
              </p>

              <button
                onClick={proceedToCheckout}
                disabled={loading}
                className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Redirecting..." : "Continue to Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
