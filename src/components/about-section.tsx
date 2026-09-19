import { ArrowRightIcon } from "./ui-icons";

const frictionPoints = [
  { label: "Manual handoffs", result: "decisions wait" },
  { label: "Disconnected tools", result: "context gets lost" },
  { label: "Repeated admin", result: "focus leaves the real work" },
] as const;

const systemSteps = [
  { title: "Understand", description: "Find the real work and its blockers." },
  { title: "Build", description: "Create useful interfaces and reliable logic." },
  { title: "Connect", description: "Bring tools, data, and people together." },
  { title: "Improve", description: "Test what works and keep refining." },
] as const;

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="friction-flow" id="about">
      <div className="friction-flow__inner">
        <div className="friction-flow__meta" data-reveal="fade">
          <span>/ 01 &nbsp; From friction to flow</span>
          <span>Better tools. Brighter work.</span>
        </div>

        <div className="friction-flow__intro">
          <h2 data-reveal="title" id="about-heading">
            <span>Where work</span> <em>slows down.</em>
          </h2>
          <p data-reveal="right">
            Small frictions quietly steal momentum. I build the systems that remove them.
          </p>
        </div>

        <ol aria-label="Common sources of workflow friction" className="friction-ledger">
          {frictionPoints.map((item, index) => (
            <li data-reveal="rise" data-reveal-delay={index * 55} key={item.label}>
              <span className="friction-ledger__index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <ArrowRightIcon className="friction-ledger__arrow" />
              <b>{item.result}</b>
            </li>
          ))}
        </ol>

        <div className="system-method">
          <div className="system-method__meta" data-reveal="fade">
            <span>/ 02 &nbsp; A simple system</span>
            <span>Less friction. More forward.</span>
          </div>
          <ol className="system-method__steps">
            {systemSteps.map((step, index) => (
              <li data-reveal="rise" data-reveal-delay={index * 40} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
                {index < systemSteps.length - 1 ? <ArrowRightIcon aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
