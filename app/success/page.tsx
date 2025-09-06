// app/success/page.tsx

import Link from "next/link";
import { CheckCircle } from "lucide-react"; // Import the CheckCircle icon from lucide-react

export default function Success() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="flex w-full max-w-lg flex-col items-center rounded-xl bg-white p-8 text-center shadow-2xl transition-all duration-300 ease-in-out hover:shadow-xl">
        {/* Animated Success Icon */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-2">
          <CheckCircle className="h-16 w-16 animate-pulse text-green-600" />
        </div>

        {/* Improved Text and Styling */}
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your order is being processed and will be
          shipped shortly.
        </p>

        {/* Navigation to Products Page */}
        <div className="mt-8 w-full">
          <Link href="/products" passHref>
            <span className="inline-block w-full cursor-pointer rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50">
              Go to Products Page
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
