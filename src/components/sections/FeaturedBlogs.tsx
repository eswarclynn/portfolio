"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import TextReveal from "../TextReveal";
import GradientMesh from "../backgrounds/GradientMesh";

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
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
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <motion.div
          style={{ rotateX, rotateY, perspective: 800 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className="group relative overflow-hidden rounded-xl border border-card-border bg-card/50 backdrop-blur-sm p-6 transition-colors duration-300 hover:border-muted/30 cursor-none h-full"
        >
          {/* Metallic reflection */}
          <div
            ref={reflectionRef}
            className="pointer-events-none absolute inset-0"
            style={{ display: "none" }}
          />

          <div className="relative z-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                {post.title}
                <svg
                  className="h-4 w-4 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
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
              <time className="font-mono text-xs text-muted shrink-0">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {post.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-card-border bg-background px-2.5 py-0.5 font-mono text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedBlogs({ posts }: { posts: BlogPostMeta[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative px-8 py-32 md:px-16 lg:px-32 overflow-hidden"
      id="blog"
    >
      <GradientMesh />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="flex items-end justify-between mb-12">
          <TextReveal
            by="word"
            className="font-mono text-3xl font-bold tracking-tight text-accent md:text-4xl"
          >
            BLOG
          </TextReveal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="font-mono text-sm text-muted hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
