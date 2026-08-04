export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  href?: string;
  /** Path under /public, e.g. "/projects/startupsphere.png". Omit until a real screenshot exists. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "startupsphere",
    title: "StartUpSphere",
    category: "Web Platform",
    description:
      "A comprehensive platform for mapping and visualizing startup ecosystems. Features interactive network graphs, stakeholder analysis, and real-time collaboration tools for tracking startup communities and their connections.",
    stack: ["React", "Spring Boot", "Tailwind CSS", "Mapbox", "MySQL"],
    image: "/projects/startupsphere.png",
  },
  {
    slug: "cinecity",
    title: "CineCity",
    category: "Capstone Project",
    description:
      "A comprehensive movie booking platform with seat selection, payment integration, and user management. Built as a capstone project demonstrating full-stack development capabilities.",
    stack: ["React", "Spring Boot", "Tailwind CSS", "MySQL", "Android Studio"],
    image: "/projects/cinecity.png",
  },
  {
    slug: "pach-drugmart",
    title: "Pach Drugmart",
    category: "Web Platform",
    description:
      "A comprehensive pharmacy management system for inventory control, prescription processing, and sales tracking. Features include medicine stock management, customer records, and automated billing system.",
    stack: ["React", "Spring Boot", "Tailwind CSS", "MySQL"],
    image: "/projects/pach-drugmart.png",
  },
  {
    slug: "sayu-cafe",
    title: "Sayu Café",
    category: "Brand Identity",
    description:
      'A specialty coffee brand built from the ground up — name, identity, and a shippable presence. "Sayu" means "early" in Cebuano. Brand tagline: "Made Fresh, Made Sayu." Warm, authentic, and cozy — a premium but welcoming identity focused on slow moments, meaningful conversations, and quality coffee.',
    stack: ["Figma", "Illustrator", "Next.js"],
  },
];
