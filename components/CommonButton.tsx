import { ButtonHTMLAttributes, ReactNode } from "react";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function CommonButton({
  children,
  ...props
}: CommonButtonProps) {
  return (
    <button
      {...props}
      className="w-full relative overflow-hidden px-4 py-2 rounded font-semibold transition-all duration-300 ease-in-out group"
    >
      {/* Gradient background */}
      <span className="absolute inset-0 bg-brand-gradient opacity-100 transition-opacity duration-300 group-hover:opacity-80" />
      {/* Button text */}
      <span className="relative z-10 text-white">{children}</span>
    </button>
  );
}
