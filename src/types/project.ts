export type ProofState = "shipped" | "prototype" | "planned";

export type ProjectSection = {
  id: string;
  title: string;
  body: string[];
  proofState?: ProofState;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type CaseStudyProject = {
  slug: "softpoint-enterprise" | "sayu-cafe" | "solara" | "pach-drugmart";
  title: string;
  proofAngle: string;
  summary: string;
  technologies: string[];
  role?: string;
  website?: string;
  sections: ProjectSection[];
  media: ProjectMedia[];
};
