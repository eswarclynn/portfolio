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

const contributions = [
  {
    project: "100mslive/web-sdks",
    url: "https://github.com/100mslive/web-sdks",
    role: "Ex-Owner & Maintainer",
    description:
      "The JavaScript and React SDKs powering 100ms video conferencing. Architected the core SDK, reactive store, hooks, and component library from the ground up.",
    tech: ["TypeScript", "React", "WebRTC"],
    stars: "38+",
    featured: true,
  },
  {
    project: "tldraw/tldraw",
    url: "https://github.com/tldraw/tldraw",
    role: "Contributor",
    description:
      "Added keyboard shortcuts support and other export actions, improving power-user workflows in the collaborative whiteboard.",
    tech: ["TypeScript", "React"],
    stars: "40K+",
  },
  {
    project: "mui/material-ui",
    url: "https://github.com/mui/material-ui",
    role: "Contributor",
    description:
      "Added Remix framework examples and fixed LiveReload guard issues, helping the MUI ecosystem support newer React meta-frameworks.",
    tech: ["React", "Remix"],
    stars: "95K+",
  },
  {
    project: "solidjs/solid-docs",
    url: "https://github.com/solidjs/solid-docs",
    role: "Contributor",
    description:
      "Documentation contribution to the SolidJS API reference, improving developer onboarding.",
    tech: ["SolidJS", "Markdown"],
    stars: "27K+",
  },
  {
    project: "onesilq/react-date-range",
    url: "https://github.com/onesilq/react-date-range",
    role: "Ex-Maintainer",
    description:
      "Contributed a custom datepicker component, fixing date handling edge cases used across the Silq freight platform.",
    tech: ["React", "JavaScript"],
  },
];

function OSSCard({
  contribution,
  index,
}: {
  contribution: (typeof contributions)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reflectionRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

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

  const c = contribution;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={c.featured ? "md:col-span-2" : ""}
    >
      <a
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          style={{ rotateX, rotateY, perspective: 800 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className={`group relative overflow-hidden rounded-xl border p-6 transition-colors duration-300 cursor-none h-full ${
            c.featured
              ? "border-accent/30 bg-accent/5 hover:border-accent/50"
              : "border-card-border bg-card/50 backdrop-blur-sm hover:border-muted/30"
          }`}
        >
          {/* Metallic reflection — updated via ref, no re-render */}
          {!c.featured && (
            <div
              ref={reflectionRef}
              className="pointer-events-none absolute inset-0"
              style={{ display: "none" }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                {c.featured && (
                  <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                    {c.role}
                  </span>
                )}
                {!c.featured && (
                  <span className="mb-3 inline-block rounded-full border border-card-border px-3 py-1 font-mono text-xs text-muted">
                    {c.role}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  {c.project}
                  <svg
                    className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
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
                </h3>
              </div>
              {c.stars && (
                <span className="flex items-center gap-1 font-mono text-xs text-muted shrink-0">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {c.stars}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.tech.map((t) => (
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

export default function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative px-8 py-32 md:px-16 lg:px-32 overflow-hidden"
      id="open-source"
    >
      <GradientMesh />
      <div className="relative z-10 mx-auto max-w-4xl">
        <TextReveal
          by="word"
          className="font-mono text-3xl font-bold tracking-tight text-accent mb-12 md:text-4xl"
        >
          OPEN SOURCE
        </TextReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {contributions.map((c, i) => (
            <OSSCard key={c.project} contribution={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
