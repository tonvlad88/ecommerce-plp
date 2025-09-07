import CommonButton from "../CommonButton";

export default function RegisterForm({ onBack }: { onBack: () => void }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Register
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <CommonButton type="submit">Create Account</CommonButton>
      </form>
      <div className="mt-4 text-center">
        <button onClick={onBack} className="text-primary hover:underline">
          ← Back to Login
        </button>
      </div>
    </>
  );
}
