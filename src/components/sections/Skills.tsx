"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "../TextReveal";
import GradientMesh from "../backgrounds/GradientMesh";

interface Skill {
  name: string;
  url?: string;
}

const skillGroups: { category: string; skills: Skill[] }[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "Python", url: "https://www.python.org" },
      { name: "Golang", url: "https://go.dev" },
      { name: "SQL" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", url: "https://react.dev" },
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "Svelte", url: "https://svelte.dev" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Django", url: "https://www.djangoproject.com" },
      { name: "Node.js", url: "https://nodejs.org" },
      { name: "Express", url: "https://expressjs.com" },
      { name: "Rails", url: "https://rubyonrails.org" },
      { name: "GraphQL", url: "https://graphql.org" },
      { name: "gRPC", url: "https://grpc.io" },
    ],
  },
  {
    category: "Infrastructure",
    skills: [
      { name: "WebRTC", url: "https://webrtc.org" },
      { name: "WebSocket" },
      { name: "Temporal", url: "https://temporal.io" },
      { name: "Protobuf", url: "https://protobuf.dev" },
      { name: "Video Streaming" },
      { name: "CDN" },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "MongoDB", url: "https://www.mongodb.com" },
      { name: "PostgreSQL", url: "https://www.postgresql.org" },
      { name: "Redis", url: "https://redis.io" },
    ],
  },
];

function SkillPill({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        boxShadow:
          "0 0 20px rgba(139, 92, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.07)",
      }}
      className="group flex items-center gap-1.5 rounded-lg border border-card-border bg-card px-5 py-3 font-mono text-sm text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
    >
      {skill.name}
      {skill.url && (
        <svg
          className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200"
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
    </motion.div>
  );

  if (skill.url) {
    return (
      <a href={skill.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  let globalIndex = 0;

  return (
    <section
      ref={ref}
      className="relative px-8 py-32 md:px-16 lg:px-32 overflow-hidden"
      id="skills"
    >
      <GradientMesh />
      <div className="relative z-10 mx-auto max-w-4xl">
        <TextReveal
          by="word"
          className="font-mono text-3xl font-bold tracking-tight text-accent mb-12 md:text-4xl"
        >
          SKILLS & TECHNOLOGIES
        </TextReveal>

        <div className="space-y-10">
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-4 font-mono text-xs tracking-widest text-muted">
                {group.category.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => {
                  const idx = globalIndex++;
                  return (
                    <SkillPill key={skill.name} skill={skill} index={idx} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
