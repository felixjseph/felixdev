export type SkillLogo =
  | "claudecode"
  | "openai"
  | "cursor"
  | "vscode"
  | "zapier"
  | "make"
  | "activepieces"
  | "vercel"
  | "docker"
  | "googlegemini";

export type SkillItem = {
  href: string;
  name: string;
  logo: SkillLogo;
};

export const skillItems: SkillItem[] = [
  { name: "Claude Code", logo: "claudecode", href: "https://claude.com/product/claude-code" },
  { name: "Codex", logo: "openai", href: "https://openai.com/codex/" },
  { name: "Cursor", logo: "cursor", href: "https://cursor.com/" },
  { name: "Visual Studio Code", logo: "vscode", href: "https://code.visualstudio.com/" },
  { name: "Zapier", logo: "zapier", href: "https://zapier.com/" },
  { name: "Make.com", logo: "make", href: "https://www.make.com/" },
  { name: "Activepieces", logo: "activepieces", href: "https://www.activepieces.com/" },
  { name: "Vercel", logo: "vercel", href: "https://vercel.com/" },
  { name: "Docker", logo: "docker", href: "https://www.docker.com/" },
  { name: "Google Gemini", logo: "googlegemini", href: "https://gemini.google.com/" },
];
