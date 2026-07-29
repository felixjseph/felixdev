import { BackToHero } from "@/components/ui/back-to-hero";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <main className="mx-auto w-[80%] py-20">
      <div className="mb-10">
        <BackToHero />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        <span className="text-add">{"// "}</span>01 — Blog
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
        Notes &amp; drafts
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
