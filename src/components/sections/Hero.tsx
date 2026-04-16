"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "../TextReveal";
import GradientText from "../GradientText";
import SparkleText from "../SparkleText";
import GradientMesh from "../backgrounds/GradientMesh";
import { experiences } from "@/lib/data";

function getYOE() {
  const start = new Date(2021, 5); // June 2021
  const now = new Date();
  const years =
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const rounded = Math.ceil(years * 2) / 2; // round up to nearest 0.5
  return rounded % 1 === 0 ? `${rounded}` : `${rounded}`;
}

export default function Hero() {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const yoe = getYOE();
  const current = experiences.find((e) => e.current)!;

  return (
    <section className="relative min-h-screen px-8 md:px-16 lg:px-32 flex items-center">
      <GradientMesh />

      <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center pt-24 pb-32">
        {/* Left — Name & Tagline */}
        <div>
          <TextReveal
            by="letter"
            className="text-5xl font-bold tracking-tight md:text-7xl"
          >
            Eswar Prasad
          </TextReveal>

          <TextReveal
            by="letter"
            delay={0.4}
            className="mt-2 text-5xl font-bold tracking-tight text-accent md:text-7xl"
          >
            Clinton
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 text-sm text-muted md:text-base"
          >
            {current.role},{" "}
            <a
              href={current.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline hover:underline-offset-4 transition-all"
            >
              {current.company}
            </a>{" "}
            • Full-Stack • {yoe} YOE • NIT AP CSE, 2022 • Bangalore, India
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-4 font-mono text-xl tracking-tight text-muted font-bold md:text-2xl"
          >
            Forge rails, move mountains.
          </motion.p>
        </div>

        {/* Right — About */}
        <div ref={aboutRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg leading-relaxed text-muted md:text-xl"
          >
            I&apos;ve always built products that talk to people - literally{" "}
            <span className="text-muted">
              (cough, <span className="text-accent">video tech</span>, cough)
            </span>{" "}
            - where the interface speaks for itself.{" "}
            <span className="text-accent">The demo was always the deck.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed text-muted md:text-xl"
          >
            AI agents just made that conversation a whole lot smarter.
            Understand the user before the user understands the product. My
            craft lives where AI, product, design, and engineering collide -
            essentially, an
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-2"
          >
            <GradientText className="text-2xl md:text-3xl">
              AI Product Engineer
            </GradientText>
            <SparkleText className="text-2xl md:text-3xl">
              <GradientText>!</GradientText>
            </SparkleText>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg leading-relaxed text-muted md:text-xl"
          >
            Thriving in the 0-to-1 and the 1-to-100 - I&apos;ve led products and
            teams through these arcs at startups where{" "}
            <span className="text-accent font-medium">
              every decision compounds
            </span>
            . Putting down roots, then staying to build the culture and
            conventions that outlast any single feature.
          </motion.p>
        </div>
      </div>

    </section>
  );
}
