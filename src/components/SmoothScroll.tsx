"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Windows already applies OS-level smooth scrolling — Lenis stacking
    // on top of it causes runaway auto-scroll. Skip Lenis on Windows.
    if (navigator.platform.startsWith("Win")) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
