"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  messages?: string[];
  interval?: number; // ms between message changes
}

export default function Loading({
  messages = [
    "Loading your products...",
    "Fetching the latest deals...",
    "Almost there...",
    "Hang tight, magic is happening ✨",
  ],
  interval = 2000,
}: LoadingProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % messages.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [messages, interval]);

  return (
    <div className="flex items-center justify-center h-screen bg-brand-gradient text-white">
      <div className="text-center space-y-6">
        {/* Spinner */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 border-4 rounded-full animate-spin"
            style={{
              borderColor: "white",
              borderTopColor: "transparent",
              borderRightColor: "var(--tw-color-primary)", // Tailwind primary
              borderBottomColor: "var(--tw-color-secondary)", // Tailwind secondary
            }}
          />
        </div>

        {/* Animated Message */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-xl font-semibold tracking-wide"
          >
            {messages[index]}
          </motion.h2>
        </AnimatePresence>

        {/* Static subtext */}
        <p className="text-sm text-white/80">
          Please wait while we prepare things for you
        </p>
      </div>
    </div>
  );
}
