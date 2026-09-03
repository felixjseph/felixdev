import { portfolioProjects, type PortfolioProject } from "@/content/portfolio";
import { ArrowUpRightIcon } from "./ui-icons";

function OperationsVisual() {
  return (
    <div aria-hidden="true" className="project-ui project-ui--operations">
      <div className="mock-sidebar">
        <span className="mock-brand">F/OPS</span>
        <i className="is-active" />
        <i />
        <i />
        <i />
      </div>
      <div className="mock-dashboard">
        <div className="mock-topbar"><span>Operations overview</span><b>Live</b></div>
        <div className="mock-metrics">
          <div><small>Open work</small><strong>24</strong><i /></div>
          <div><small>Automated</small><strong>81%</strong><i /></div>
          <div><small>Exceptions</small><strong>03</strong><i /></div>
        </div>
        <div className="mock-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="mock-table"><span /><span /><span /><span /></div>
      </div>
    </div>
  );
}

function DocumentsVisual() {
  return (
    <div aria-hidden="true" className="project-ui project-ui--documents">
      <div className="document-stack">
        <div className="document-page document-page--back" />
        <div className="document-page document-page--front">
          <span>INPUT / PDF</span>
          <i /><i /><i /><i /><i />
          <b>98.4%</b>
        </div>
      </div>
      <div className="extraction-line"><i /><span>Extract</span><i /><span>Validate</span><i /></div>
      <div className="json-panel">
        <span>{"{"}</span>
        <span>&nbsp;&nbsp;&quot;status&quot;: &quot;verified&quot;,</span>
        <span>&nbsp;&nbsp;&quot;confidence&quot;: 0.984</span>
        <span>{"}"}</span>
      </div>
    </div>
  );
}

function AgentsVisual() {
  return (
    <div aria-hidden="true" className="project-ui project-ui--agents">
      <div className="agent-orbit">
        <span className="agent-core">Human</span>
        <span className="agent-node agent-node--one">Research</span>
        <span className="agent-node agent-node--two">Act</span>
        <span className="agent-node agent-node--three">Verify</span>
        <i className="orbit orbit--one" />
        <i className="orbit orbit--two" />
      </div>
      <div className="agent-log">
        <span><i /> Agent run started</span>
        <span><i /> Approval requested</span>
        <span><i /> Human decision recorded</span>
      </div>
    </div>
  );
}

function ProjectVisual({ visual }: Pick<PortfolioProject, "visual">) {
  if (visual === "operations") return <OperationsVisual />;
  if (visual === "documents") return <DocumentsVisual />;
  return <AgentsVisual />;
}

export function ProjectsSection() {
  return (
    <section aria-labelledby="projects-heading" className="section-shell projects-section" id="projects">
      <div className="section-heading-grid projects-heading">
        <h2 data-reveal="title" id="projects-heading">
          Products designed around <span>real operational leverage.</span>
        </h2>
        <p data-reveal data-reveal-delay="70">
          Concept studies awaiting approved assets, responsibilities, and verified results.
        </p>
      </div>

      <div className="project-list">
        {portfolioProjects.map((project) => (
          <article className="project-feature" key={project.number}>
            <div className="project-feature__content">
              <div className="project-feature__meta" data-reveal>
                <span>Project {project.number}</span>
                <span>{project.category}</span>
              </div>
              <h3 data-reveal="title">{project.title}</h3>
              <div className="project-story">
                <div data-reveal data-reveal-delay="50">
                  <span>Problem</span>
                  <p>{project.problem}</p>
                </div>
                <div data-reveal data-reveal-delay="100">
                  <span>System</span>
                  <p>{project.solution}</p>
                </div>
              </div>
              <ul aria-label={`${project.title} technologies`} className="project-tags" data-reveal>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <p className="project-target" data-reveal><span aria-hidden="true" />{project.target}</p>
              <details className="project-disclosure" data-reveal>
                <summary>View project <ArrowUpRightIcon /></summary>
                <p>
                  Case study route pending. Replace this panel with approved screenshots, responsibilities, and
                  verified results before launch.
                </p>
              </details>
            </div>
            <div className="project-feature__visual" data-reveal="card" data-reveal-delay="90">
              <div className="placeholder-label">Replaceable visual / {project.number}</div>
              <ProjectVisual visual={project.visual} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
