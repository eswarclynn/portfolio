"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import TextReveal from "../TextReveal";
import GradientMesh from "../backgrounds/GradientMesh";
import { experiences } from "@/lib/data";

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reflectionRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [3, -3]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-3, 3]), {
    stiffness: 300,
    damping: 30,
  });

  const isHighlighted = exp.current;

  function handleMouse(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    x.set(cx - rect.width / 2);
    y.set(cy - rect.height / 2);
    const el = reflectionRef.current;
    if (el) {
      el.style.background = `radial-gradient(400px circle at ${cx}px ${cy}px, rgba(139,92,246,0.06) 0%, transparent 70%)`;
      el.style.display = "";
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    const el = reflectionRef.current;
    if (el) el.style.display = "none";
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-card-border" />
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-2 -translate-x-1/2 h-3 w-3 rounded-full border-2 ${
          isHighlighted
            ? "border-accent bg-accent"
            : "border-card-border bg-background"
        }`}
      />

      <a
        href={exp.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          style={{ rotateX, rotateY, perspective: 800 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className={`group relative overflow-hidden rounded-xl border p-6 transition-colors duration-300 cursor-none ${
            isHighlighted
              ? "border-accent/30 bg-accent/5 hover:border-accent/50"
              : "border-card-border bg-card/50 backdrop-blur-sm hover:border-muted/30"
          }`}
        >
          {/* Metallic reflection — follows mouse (updated via ref, no re-render) */}
          {!isHighlighted && (
            <div
              ref={reflectionRef}
              className="pointer-events-none absolute inset-0"
              style={{ display: "none" }}
            />
          )}

          <div className="relative z-10">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role}
                </h3>
                <span className="inline-flex items-center gap-1 font-mono text-sm text-accent">
                  {exp.company}
                  <svg
                    className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isHighlighted && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                    Current
                  </span>
                )}
                <p className="font-mono text-xs text-muted">{exp.period}</p>
              </div>
            </div>

            {exp.location && (
              <p className="mt-1 font-mono text-xs text-muted">
                {exp.location}
              </p>
            )}

            <ul className="mt-4 space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed text-muted pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-muted/50"
                >
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-card-border bg-background px-3 py-1 font-mono text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      className="relative px-8 py-32 md:px-16 lg:px-32 overflow-hidden"
      id="experience"
    >
      <GradientMesh />
      <div className="relative z-10 mx-auto max-w-4xl">
        <TextReveal
          by="word"
          className="font-mono text-3xl font-bold tracking-tight text-accent mb-12 md:text-4xl"
        >
          EXPERIENCE
        </TextReveal>

        <div className="relative">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
