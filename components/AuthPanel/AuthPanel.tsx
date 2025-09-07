"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPassword";

export default function AuthPanel() {
  const [view, setView] = useState<"login" | "register" | "forgot">("login");

  const panelVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 },
  };

  return (
    <div className="w-full max-w-md relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="backdrop-blur-md bg-white/80 rounded-xl p-8 shadow-lg border border-white/20
                     shadow-[0_0_20px_rgba(79,70,229,0.15),0_0_40px_rgba(147,51,234,0.15)]
                     hover:shadow-[0_0_25px_rgba(79,70,229,0.25),0_0_50px_rgba(147,51,234,0.25)]
                     transition-shadow duration-300"
        >
          {view === "login" && (
            <LoginForm
              onRegister={() => setView("register")}
              onForgot={() => setView("forgot")}
            />
          )}
          {view === "register" && (
            <RegisterForm onBack={() => setView("login")} />
          )}
          {view === "forgot" && (
            <ForgotPasswordForm onBack={() => setView("login")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
