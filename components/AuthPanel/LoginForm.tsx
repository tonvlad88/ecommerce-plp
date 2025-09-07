import CommonButton from "../CommonButton";

export default function LoginForm({
  onRegister,
  onForgot,
}: {
  onRegister: () => void;
  onForgot: () => void;
}) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Login
      </h2>
      <form className="space-y-4">
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
        <CommonButton type="submit">Sign In</CommonButton>
      </form>
      <div className="mt-4 text-center text-sm">
        <button onClick={onForgot} className="text-primary hover:underline">
          Forgot password?
        </button>
      </div>
      <div className="mt-2 text-center text-sm">
        Don’t have an account?{" "}
        <button onClick={onRegister} className="text-primary hover:underline">
          Register
        </button>
      </div>
    </>
  );
}
