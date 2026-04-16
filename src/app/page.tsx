import { getAllPosts } from "@/lib/blog";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  const featuredSlugs = [
    "temporal-in-practice",
    "simulcast-and-subscribe-degradation",
    "building-the-whiteboard",
    "reconnection-in-video-calls",
  ];

  const allPosts = getAllPosts();
  const posts = featuredSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map(({ slug, title, date, description, tags }) => ({
      slug,
      title,
      date,
      description,
      tags,
    }));

  return <HomeClient posts={posts} />;
}
