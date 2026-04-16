import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Eswar Prasad Clinton",
  description: "Thoughts on frontend architecture, SDKs, video streaming, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen px-8 pt-32 pb-16 md:px-16 lg:px-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-mono text-sm tracking-widest text-accent mb-4">
          BLOG
        </h1>
        <p className="text-2xl font-light text-foreground mb-2 md:text-3xl">
          Writing about what I learn.
        </p>
        <p className="text-muted mb-16">
          Thoughts on frontend architecture, SDKs, video streaming, and the craft of building software.
        </p>

        {posts.length === 0 ? (
          <p className="text-muted font-mono text-sm">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-1">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-transparent p-6 transition-all duration-300 hover:border-card-border hover:bg-card"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>
                  <time className="font-mono text-xs text-muted shrink-0">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-card-border px-2.5 py-0.5 font-mono text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
