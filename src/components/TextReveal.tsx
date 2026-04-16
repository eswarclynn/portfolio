"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  by?: "word" | "letter" | "line";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  by = "word",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (by === "line") {
    return (
      <div ref={ref} className={className}>
        <div style={{ clipPath: "inset(0 0 0 0)" }}>
          <motion.div
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay,
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    );
  }

  const items = by === "word" ? children.split(" ") : children.split("");

  return (
    <div ref={ref} className={className}>
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            clipPath: "inset(0 0 0 0)",
            lineHeight: "inherit",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: delay + i * (by === "word" ? 0.05 : 0.02),
            }}
          >
            {by === "letter" && item === " " ? "\u00A0" : item}
            {by === "word" ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
