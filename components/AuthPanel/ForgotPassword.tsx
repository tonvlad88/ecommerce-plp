import CommonButton from "../CommonButton";

export default function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Reset Password
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <CommonButton type="submit">Send Reset Link</CommonButton>
      </form>
      <div className="mt-4 text-center">
        <button onClick={onBack} className="text-primary hover:underline">
          ← Back to Login
        </button>
      </div>
    </>
  );
}
