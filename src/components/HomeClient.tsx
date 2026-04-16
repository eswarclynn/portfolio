"use client";

import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
import OpenSource from "@/components/sections/OpenSource";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export default function HomeClient({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <FeaturedBlogs posts={posts} />
      <OpenSource />
      <Projects />
      <Contact />
    </>
  );
}
