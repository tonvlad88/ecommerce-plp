import GlowButton from "@/components/glowButton";

export default function Home() {
  return (
    <div className="h-screen brand-gradient text-white flex items-center justify-center">
      <div className="text-center space-y-8 px-4 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl">
          👋 Welcome to ECommerce PLP
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90">
          Discover amazing products tailored just for you.
        </p>
        <GlowButton href="/products">Go to Products</GlowButton>
      </div>
    </div>
  );
}
