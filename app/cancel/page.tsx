// app/cancel/page.tsx

import Link from "next/link";
import { XCircle } from "lucide-react"; // Import the XCircle icon from lucide-react

export default function Cancel() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="flex w-full max-w-lg flex-col items-center rounded-xl bg-white p-8 text-center shadow-2xl transition-all duration-300 ease-in-out hover:shadow-xl">
        {/* Cancel Icon */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 p-2">
          <XCircle className="h-16 w-16 animate-pulse text-red-600" />
        </div>

        {/* Improved Text and Styling */}
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-600">
          Your payment was not completed. If this was a mistake, please try
          again.
        </p>

        {/* Navigation to Products Page */}
        <div className="mt-8 w-full">
          <Link href="/products" passHref>
            <span className="inline-block w-full cursor-pointer rounded-lg bg-gray-200 px-6 py-3 text-lg font-semibold text-gray-800 shadow-lg transition-all duration-300 hover:bg-gray-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50">
              Go to Products Page
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
