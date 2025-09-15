"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import AuthPanel from "@/components/AuthPanel/AuthPanel";
import Loading from "@/components/Loading";
import GlowButton from "@/components/GlowButton";
import Image from "next/image";

interface GetStarted {
  welcomeText: string;
  appName1: string;
  appName2: string;
  appTagline: string;
  appTagline2: string;
  buttonTitle: string;
  buttonLink: string;
}

export default function Home() {
  const [hero, setHero] = useState<GetStarted | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "pages", "pages-content");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setHero(snap.data().getStarted);
        }
      } catch (err) {
        console.error("Error fetching landing page content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Loading messages={["Hang tight, magic is happening ✨"]} />
        </motion.div>
      ) : (
        hero && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen grid grid-cols-1 md:grid-cols-2"
          >
            {/* Left Column — Hero */}
            <div className="brand-gradient text-white flex items-center justify-center p-8">
              <div className="text-center space-y-8 animate-fade-in max-w-md">
                {/* App Logo at the top */}
                <div className="flex justify-center">
                  <Image
                    src="/app-logo.png"
                    alt="App Logo"
                    width={160}
                    height={160}
                    priority
                    className="object-contain"
                  />
                </div>

                <h1 className="font-extrabold drop-shadow-xl">
                  {/* <span className="block text-2xl md:text-3xl">
                    {hero.welcomeText}
                  </span> */}
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-10 text-primary">
                    {/* {hero.appName1} {hero.appName2} */}
                    {hero.appTagline}
                  </span>
                </h1>

                <p className="text-lg md:text-xl font-light opacity-90">
                  {hero.appTagline2}
                </p>

                <GlowButton href={hero.buttonLink}>
                  {hero.buttonTitle}
                </GlowButton>
              </div>
            </div>

            {/* Right Column — Auth Panel */}
            <div className="flex items-center justify-center p-8 bg-surface overflow-y-auto">
              <AuthPanel />
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}
