export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  status: "draft";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-ai-features-without-a-data-team",
    title: "Shipping AI features without a data team",
    excerpt:
      "Notes on getting generative AI into production for small teams that don't have the headcount for a dedicated ML org.",
    status: "draft",
  },
  {
    slug: "what-msmes-actually-need-from-software",
    title: "What MSMEs actually need from software",
    excerpt:
      "Lessons from building for micro, small, and medium enterprises — where the constraints are budget and time, not ambition.",
    status: "draft",
  },
  {
    slug: "full-stack-fast-my-stack",
    title: "Full stack, fast: my Next.js + Spring Boot stack",
    excerpt:
      "The toolchain I reach for by default, and why I've stuck with it across four very different projects.",
    status: "draft",
  },
  {
    slug: "prompting-for-production-not-demos",
    title: "Prompting for production, not demos",
    excerpt:
      "What changes when a generative AI feature has to survive real users instead of a single polished screenshot.",
    status: "draft",
  },
  {
    slug: "capstone-to-client-ready",
    title: "From capstone to client-ready",
    excerpt:
      "What actually changed when CineCity went from a school project to something built like it had to last.",
    status: "draft",
  },
];
