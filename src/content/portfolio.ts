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
  name: string;
  logo: SkillLogo;
};

export const skillItems: SkillItem[] = [
  { name: "Claude Code", logo: "claudecode" },
  { name: "Codex", logo: "openai" },
  { name: "Cursor", logo: "cursor" },
  { name: "Visual Studio Code", logo: "vscode" },
  { name: "Zapier", logo: "zapier" },
  { name: "Make.com", logo: "make" },
  { name: "Activepieces", logo: "activepieces" },
  { name: "Vercel", logo: "vercel" },
  { name: "Docker", logo: "docker" },
  { name: "Google Gemini", logo: "googlegemini" },
];
