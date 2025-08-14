export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold tracking-wide">
          Loading your products...
        </h2>
        <p className="text-sm text-purple-200">
          Hang tight, magic is happening ✨
        </p>
      </div>
    </div>
  );
}
