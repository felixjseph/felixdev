export type SkillLogo =
  | "typescript"
  | "javascript"
  | "kotlin"
  | "python"
  | "c"
  | "php"
  | "html5"
  | "css"
  | "nextdotjs"
  | "react"
  | "springboot"
  | "django"
  | "tailwindcss"
  | "android"
  | "supabase"
  | "docker"
  | "git"
  | "googlegemini"
  | "anthropic"
  | "zapier";

export type SkillItem = {
  name: string;
  logo: SkillLogo;
};

export const skillItems: SkillItem[] = [
  { name: "TypeScript", logo: "typescript" },
  { name: "JavaScript", logo: "javascript" },
  { name: "Kotlin", logo: "kotlin" },
  { name: "Python", logo: "python" },
  { name: "C", logo: "c" },
  { name: "PHP", logo: "php" },
  { name: "HTML5", logo: "html5" },
  { name: "CSS3", logo: "css" },
  { name: "Next.js", logo: "nextdotjs" },
  { name: "React", logo: "react" },
  { name: "Spring Boot", logo: "springboot" },
  { name: "Django", logo: "django" },
  { name: "Tailwind CSS", logo: "tailwindcss" },
  { name: "Android", logo: "android" },
  { name: "Supabase", logo: "supabase" },
  { name: "Docker", logo: "docker" },
  { name: "Git", logo: "git" },
  { name: "Google Gemini", logo: "googlegemini" },
  { name: "Anthropic", logo: "anthropic" },
  { name: "Zapier", logo: "zapier" },
];
