"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], [data-cursor="pointer"]';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  const isVisible = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);
  const isHoveringClickable = useRef(false);
  const lastClickableCheck = useRef(0);

  const setClickableState = useCallback((hovering: boolean) => {
    if (isHoveringClickable.current === hovering) return;
    isHoveringClickable.current = hovering;

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    if (hovering) {
      // Hollow dot
      dot.style.background = "transparent";
      dot.style.boxShadow = "inset 0 0 0 1.5px var(--accent)";
      dot.style.transform = "scale(1.4)";
    } else {
      // Filled dot
      dot.style.background = "";
      dot.style.boxShadow = "none";
      dot.style.transform = "scale(1)";
    }
  }, []);

  const spawnImpact = useCallback(() => {
    const container = ripplesRef.current;
    if (!container) return;

    // Clean accent lines — start offset from cursor, shoot outward
    const count = 5;
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i - 90 + (Math.random() * 20 - 10);
      const line = document.createElement("div");
      line.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 1.5px;
        height: 8px;
        margin-left: -0.75px;
        background: var(--accent);
        transform-origin: center top;
        transform: rotate(${angle}deg) translateY(-14px);
        pointer-events: none;
        border-radius: 1px;
        opacity: 0.7;
      `;
      container.appendChild(line);

      const anim = line.animate(
        [
          { transform: `rotate(${angle}deg) translateY(-14px)`, opacity: 0.7 },
          { transform: `rotate(${angle}deg) translateY(-24px)`, opacity: 0 },
        ],
        { duration: 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
      );
      anim.onfinish = () => line.remove();
    }
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible.current) {
        isVisible.current = true;
        if (containerRef.current) containerRef.current.style.opacity = "1";
      }

      // Throttle the closest() DOM traversal to ~every 50ms
      const now = performance.now();
      if (now - lastClickableCheck.current > 50) {
        lastClickableCheck.current = now;
        const target = e.target as HTMLElement;
        const clickable = target.closest(CLICKABLE_SELECTOR);
        setClickableState(!!clickable);
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (containerRef.current) containerRef.current.style.opacity = "0";
      setClickableState(false);
    };

    const onMouseDown = () => {
      const dot = dotRef.current;
      if (!dot) return;

      if (isHoveringClickable.current) {
        dot.style.transform = "scale(0.8)";
      } else {
        dot.style.transform = "scale(0.4)";
      }
    };

    const onMouseUp = () => {
      const dot = dotRef.current;
      if (!dot) return;

      const restScale = isHoveringClickable.current ? "scale(1.4)" : "scale(1)";
      const burstScale = isHoveringClickable.current ? "scale(1.8)" : "scale(1.6)";

      dot.style.transform = burstScale;
      requestAnimationFrame(() => {
        setTimeout(() => {
          dot.style.transform = restScale;
        }, 120);
      });

      spawnImpact();
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [cursorX, cursorY, setClickableState, spawnImpact]);

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none fixed top-0 left-0 z-9999 hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: 0,
        transition: "opacity 0.3s",
      }}
    >
      {/* Spotlight glow */}
      <div
        ref={glowRef}
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: -150,
          left: -150,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="absolute rounded-full bg-accent"
        style={{
          width: 8,
          height: 8,
          top: -4,
          left: -4,
          transition:
            "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease, background 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      {/* Ripple container */}
      <div
        ref={ripplesRef}
        className="absolute"
        style={{ top: 0, left: 0, width: 0, height: 0 }}
      />
    </motion.div>
  );
}
