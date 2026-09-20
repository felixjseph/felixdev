export type SkillLogo = "claudecode" | "cursor" | "zapier";

export type SkillItem = {
  name: string;
  logo?: SkillLogo;
};

export const skillItems: SkillItem[] = [
  { name: "Claude Code", logo: "claudecode" },
  { name: "Codex" },
  { name: "Cursor", logo: "cursor" },
  { name: "VS Code" },
  { name: "Zapier", logo: "zapier" },
  { name: "AI workflows" },
];
