export type TechStackGroup = {
  category: string;
  items: string[];
};

// Derived from lib/projects.ts stacks and lib/certifications.ts issuers.
export const techStack: TechStackGroup[] = [
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Mapbox"] },
  { category: "Backend", items: ["Spring Boot"] },
  { category: "Data", items: ["MySQL"] },
  { category: "Cloud", items: ["AWS"] },
  { category: "Design", items: ["Figma", "Illustrator"] },
  { category: "Mobile", items: ["Android Studio"] },
];
