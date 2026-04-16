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

const projects = [
  {
    title: "100ms Web SDKs",
    description:
      "Architected the JavaScript and React SDKs powering 100ms video conferencing. Built the reactive state management layer, hooks, selectors, and store reconciliation. 790+ commits, used by thousands of developers.",
    tech: ["TypeScript", "React", "WebRTC", "Svelte"],
    link: "https://github.com/100mslive/web-sdks",
    featured: true,
  },
  {
    title: "Simulcast & Subscribe Degradation",
    description:
      "Implemented simulcast encoding and subscribe-side degradation for 100ms - the two features that make large video calls possible without CPUs catching fire. Smart bandwidth distribution across multiple encoding layers.",
    tech: ["WebRTC", "TypeScript", "Video Streaming"],
  },
  {
    title: "Collaborative Whiteboard",
    description:
      "Built an Excalidraw-based real-time whiteboard as a standalone npm package (hms-excalidraw). Real-time cursor sync, Firebase integration, published 14+ versions. Later rebuilt as a proper SDK package (@100mslive/hms-whiteboard).",
    tech: ["TypeScript", "React", "Excalidraw", "Firebase"],
    link: "https://www.100ms.live/docs/javascript/v2/how-to-guides/extend-capabilities/whiteboard",
  },
  {
    title: "Pre-Call Diagnostics",
    description:
      "End-to-end audio/video/network diagnostic tool - both SDK APIs and the full UI. Tests device access, codec support, network quality, and connectivity before joining a call.",
    tech: ["TypeScript", "React", "WebRTC"],
  },
  {
    title: "Polls & Quizzes System",
    description:
      "Real-time interactive polling and quiz system embedded in live video calls. Viewer-on-stage flow, mid-call preview, and live result aggregation.",
    tech: ["TypeScript", "React", "WebSocket"],
  },
  {
    title: "Hostel Management System",
    description:
      "Recognized as the official Hostel Management System of NIT Andhra Pradesh by the Director. Full-stack application handling room allocation, complaints, and administration.",
    tech: ["Django", "PostgreSQL", "JavaScript"],
  },
  {
    title: "Cross-Language Plagiarism Detection",
    description:
      "Developed and compared multiple ML models (Google BERT-MuRIL vs. LDA vs. ASA) to detect plagiarism across different Indian regional languages.",
    tech: ["Python", "BERT", "NLP"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const card = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="group rounded-xl border border-card-border bg-card/50 backdrop-blur-sm p-8 transition-colors duration-300 hover:border-accent/30 cursor-none h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          {project.featured && (
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
            {project.title}
            {project.link && (
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
            )}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-card-border px-3 py-1 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${project.featured ? "md:col-span-2" : ""}`}
      >
        {card}
      </a>
    );
  }

  return card;
}

export default function Projects() {
  return (
    <section className="relative px-8 py-32 md:px-16 lg:px-32 overflow-hidden" id="projects">
      <GradientMesh />
      <div className="relative z-10 mx-auto max-w-4xl">
        <TextReveal
          by="word"
          className="font-mono text-3xl font-bold tracking-tight text-accent mb-12 md:text-4xl"
        >
          PROJECTS
        </TextReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
