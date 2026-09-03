import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CaseStudyHero } from "./case-study-hero";
import { CaseStudyNavigation } from "./case-study-navigation";
import { CaseStudySection } from "./case-study-section";
import { ProjectGallery } from "./project-gallery";
import { getNextProject, getProjectBySlug } from "@/lib/projects";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

function SayuFixture() {
  const project = getProjectBySlug("sayu-cafe")!;
  const nextProject = getNextProject(project.slug);

  return (
    <main>
      <CaseStudyHero project={project} />
      <CaseStudyNavigation nextProject={nextProject} sections={project.sections} />
      {project.sections.map((section) => (
        <CaseStudySection key={section.id} section={section} />
      ))}
      <ProjectGallery media={project.media} projectTitle={project.title} />
    </main>
  );
}

describe("case study shell", () => {
  it("does not infer a project-wide shipped state for Sayu's mixed proof", () => {
    render(<CaseStudyHero project={getProjectBySlug("sayu-cafe")!} />);

    expect(screen.queryByText("Shipped")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Sayu Café" })).toBeInTheDocument();
  });

  it("renders an accessible Sayu case study with truthful proof states", () => {
    const { container } = render(<SayuFixture />);

    expect(screen.getByRole("heading", { level: 1, name: "Sayu Café" })).toBeInTheDocument();
    expect(screen.getAllByText("Shipped")).not.toHaveLength(0);
    expect(screen.queryByText("Shipped", { selector: "section#drink-builder *" })).not.toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Case study chapters" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Next project: Solara/i })).toHaveAttribute("href", "/work/solara");

    for (const section of getProjectBySlug("sayu-cafe")!.sections) {
      const anchor = screen.getByRole("link", { name: section.title });
      expect(anchor).toHaveAttribute("href", `#${section.id}`);
      expect(container.querySelector(`section#${section.id}`)).toBeInTheDocument();
    }

    const gallery = screen.getByRole("region", { name: "Sayu Café project gallery" });
    const image = within(gallery).getByRole("img", {
      name: "Development fallback artwork for the Sayu Café case study.",
    });
    expect(image).toHaveAttribute("width", "1440");
    expect(image).toHaveAttribute("height", "900");
    expect(within(gallery).getByText(/Development media fallback/i)).toBeVisible();
    expect(screen.getAllByText(/Shipped|Prototype|Planned/)).toHaveLength(6);
  });
});
