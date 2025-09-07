import GlowButton from "@/components/glowButton";
import AuthPanel from "@/components/AuthPanel/AuthPanel";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column — Hero */}
      <div className="brand-gradient text-white flex items-center justify-center p-8">
        <div className="text-center space-y-8 animate-fade-in max-w-md">
          <h1 className="font-extrabold drop-shadow-xl">
            <span className="block md:inline text-2xl md:text-3xl">
              👋 Welcome to{" "}
            </span>
            <span className="block md:inline text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-4 md:my-0">
              ECommerce PLP
            </span>
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90">
            Discover amazing products tailored just for you.
          </p>
          <GlowButton href="/products">Browse Products</GlowButton>
        </div>
      </div>

      {/* Right Column — Auth Panel */}
      <div className="flex items-center justify-center p-8 bg-surface overflow-y-auto">
        <AuthPanel />
      </div>
    </div>
  );
}
