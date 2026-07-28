import { BlogPostCard } from "@/components/ui/blog-post-card";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <main className="mx-auto w-[80%] py-20">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        N° 01 — Blog
      </p>
      <h1 className="mt-4 font-display font-medium leading-display text-4xl text-ink sm:text-5xl">
        Notes & drafts
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
