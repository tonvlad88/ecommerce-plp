"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-indigo-600 hover:text-indigo-800 text-sm mb-6 transition-all duration-300 ease-out hover:scale-105"
    >
      ← Back to Products
    </button>
  );
}
