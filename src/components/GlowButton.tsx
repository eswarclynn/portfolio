"use client";

import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function GlowButton({
  children,
  className = "",
  as = "div",
  href,
  target,
  rel,
  onClick,
}: GlowButtonProps) {
  const Component = motion.create(as as "div");

  const props: Record<string, unknown> = {
    className: `relative ${className}`,
    whileHover: {
      boxShadow: "0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)",
    },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.3 },
    onClick,
  };

  if (as === "a") {
    props.href = href;
    props.target = target;
    props.rel = rel;
  }

  return <Component {...props}>{children}</Component>;
}
