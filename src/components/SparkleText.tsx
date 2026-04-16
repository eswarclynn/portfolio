"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  delay: number;
  symbol: string;
}

const symbols = ["✦", "✧", "⭑", "✦", "✧"];
let sparkleId = 0;

export default function SparkleText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle: Sparkle = {
        id: sparkleId++,
        x: -4 + Math.random() * 8,
        delay: Math.random() * 0.2,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      };
      setSparkles((prev) => [...prev.slice(-5), newSparkle]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {children}

      {/* Sparkle symbols anchored to the right end */}
      <span className="absolute right-[50%] top-0 bottom-0 w-0 pointer-events-none overflow-visible">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.span
              key={sparkle.id}
              initial={{
                opacity: 0,
                y: 0,
                x: sparkle.x,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -50,
                scale: [0, 1, 0.8, 0],
                rotate: [0, 20, -10, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.4,
                delay: sparkle.delay,
                ease: "easeOut",
              }}
              className="absolute bottom-full text-accent"
              style={{ fontSize: "0.6em" }}
            >
              {sparkle.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </span>
  );
}
