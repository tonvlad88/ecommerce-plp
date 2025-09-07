import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
}

export default function GlowButton({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block px-8 py-3 rounded-full font-semibold shadow-lg
                 bg-gradient-to-r from-primary to-secondary
                 hover:from-primary-light hover:to-secondary-light
                 transition-all duration-300
                 shadow-[0_0_15px_rgba(79,70,229,0.6),0_0_30px_rgba(147,51,234,0.4)]
                 hover:shadow-[0_0_20px_rgba(129,140,248,0.8),0_0_40px_rgba(192,132,252,0.6)]
                 hover:scale-105"
    >
      {children}
    </Link>
  );
}
