import { ArrowLink } from "@/components/ui/arrow-link";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { blogPosts } from "@/lib/blog";

export function BlogSection() {
  const preview = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="mx-auto w-[80%] py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
            <span className="text-add">{"// "}</span>01 — Blog
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            Notes &amp; drafts
          </h2>
        </div>
        <ArrowLink href="/blog">View all posts</ArrowLink>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {preview.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
