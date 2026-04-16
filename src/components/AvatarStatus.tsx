"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Schedule (IST hours)                                               */
/* ------------------------------------------------------------------ */
type Activity =
  | "sleeping"
  | "gym"
  | "eating"
  | "working"
  | "badminton"
  | "reading";

interface ScheduleSlot {
  start: number;
  end: number;
  activity: Activity;
  label: string;
}

const SCHEDULE: ScheduleSlot[] = [
  { start: 23, end: 30, activity: "sleeping", label: "sleeping 💤" },
  { start: 6, end: 8, activity: "gym", label: "at the gym 🏋️" },
  { start: 8, end: 9, activity: "eating", label: "having breakfast 🍳" },
  { start: 9, end: 13, activity: "working", label: "building stuff 💻" },
  { start: 13, end: 14, activity: "eating", label: "having lunch 🍛" },
  { start: 14, end: 18, activity: "working", label: "building stuff 💻" },
  { start: 18, end: 20, activity: "badminton", label: "playing badminton 🏸" },
  { start: 20, end: 21, activity: "eating", label: "having dinner 🍽️" },
  { start: 21, end: 23, activity: "reading", label: "reading a book 📚" },
];

const AVATAR_IMAGES: Record<Activity, string> = {
  sleeping: "/avatar/sleeping.png",
  gym: "/avatar/gym.png",
  eating: "/avatar/eating.png",
  working: "/avatar/working.png",
  badminton: "/avatar/badminton.png",
  reading: "/avatar/reading.png",
};

function getActivity(): { activity: Activity; label: string } {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  const hour = ist.getHours() + ist.getMinutes() / 60;

  for (const slot of SCHEDULE) {
    let h = hour;
    if (slot.end > 24 && h < slot.end - 24) h += 24;
    if (h >= slot.start && h < slot.end) {
      return { activity: slot.activity, label: slot.label };
    }
  }
  return { activity: "sleeping", label: "sleeping 💤" };
}

/* ------------------------------------------------------------------ */
/*  Exports for preview page                                           */
/* ------------------------------------------------------------------ */
export { AVATAR_IMAGES };
export type { Activity };

/* How far the cursor can be (px) before the avatar reacts */
const PROXIMITY_RADIUS = 300;
/* Max tilt/shift in px */
const MAX_SHIFT = 12;
const MAX_ROTATE = 14;

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function AvatarStatus() {
  const [current, setCurrent] = useState<{ activity: Activity; label: string }>(
    () => getActivity()
  );
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(0);

  /* --- motion values for parallax --- */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springCfg = { damping: 25, stiffness: 200 };
  const shiftX = useSpring(rawX, springCfg);
  const shiftY = useSpring(rawY, springCfg);
  const rotateX = useSpring(rawRotateX, springCfg);
  const rotateY = useSpring(rawRotateY, springCfg);

  /* Update every minute */
  useEffect(() => {
    const id = setInterval(() => setCurrent(getActivity()), 60_000);
    return () => clearInterval(id);
  }, []);

  /* Global mousemove — track proximity to avatar */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime.current < 30) return;
      lastMoveTime.current = now;

      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > PROXIMITY_RADIUS) {
        rawX.set(0);
        rawY.set(0);
        rawRotateX.set(0);
        rawRotateY.set(0);
        return;
      }

      const factor = 1 - dist / PROXIMITY_RADIUS;
      const normX = dx / PROXIMITY_RADIUS;
      const normY = dy / PROXIMITY_RADIUS;

      /* Shift image toward cursor */
      rawX.set(normX * MAX_SHIFT * factor);
      rawY.set(normY * MAX_SHIFT * factor);

      /* 3D tilt */
      rawRotateX.set(-normY * MAX_ROTATE * factor);
      rawRotateY.set(normX * MAX_ROTATE * factor);
    },
    [rawX, rawY, rawRotateX, rawRotateY, lastMoveTime]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="pointer"
    >
      {/* Tooltip */}
      {hovered && (
        <div className="rounded-lg border border-card-border bg-card px-4 py-2 font-mono text-xs text-muted shadow-lg shadow-black/30">
          <span className="text-foreground font-medium">Eswar is probably</span>
          <br />
          <span className="text-accent">{current.label}</span>
        </div>
      )}

      {/* Avatar card — parallax only */}
      <div className="relative h-24 w-24" style={{ perspective: 400 }}>
        <motion.div
          className="relative h-full w-full rounded-2xl border border-card-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/20"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{ x: shiftX, y: shiftY }}
          >
            <Image
              src={AVATAR_IMAGES[current.activity]}
              alt={current.label}
              fill
              className="object-contain p-1"
              sizes="96px"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
