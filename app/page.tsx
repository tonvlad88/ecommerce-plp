import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          👋 Welcome to ECommerce PLP
        </h1>
        <p className="text-lg font-light">
          Discover amazing products tailored just for you.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-indigo-100 transition duration-300"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}
