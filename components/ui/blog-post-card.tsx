import type { BlogPost } from "@/lib/blog";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col border-t border-border pt-6">
      <span className="w-fit border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
        Draft
      </span>
      <h3 className="mt-4 font-display text-xl font-medium text-ink">
        {post.title}
      </h3>
      <p className="mt-2 font-body text-ink">{post.excerpt}</p>
    </div>
  );
}
