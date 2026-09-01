"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { HeroParticles } from "./hero-particles";
import { ArrowDownRightIcon, ArrowRightIcon, RefreshIcon } from "./ui-icons";

const keywords = ["Agentic AI", "Full-stack systems", "Workflow automation"];

export function SignalHero() {
  const [activeKeyword, setActiveKeyword] = useState(0);

  return (
    <section aria-labelledby="hero-heading" className="signal-hero" id="hero">
      <HeroParticles particleCount={300} />
      <div aria-hidden="true" className="hero-ambient" />
      <div className="hero-shell">
        <div className="hero-copy">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="availability"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span aria-hidden="true" />
            Felix Joseph Castañeda · Full-Stack Web &amp; AI Developer
          </motion.div>

          <motion.h1
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            initial={{ filter: "blur(12px)", opacity: 0, y: 34 }}
            transition={{ delay: 0.16, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            id="hero-heading"
          >
            I build systems that turn <em>busywork</em> into forward motion.
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="hero-statement"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.28, duration: 0.75 }}
          >
            I love shipping cool stuff that gives people meaningful value—full-stack applications, intelligent
            workflows, and automation built around real business problems.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.38, duration: 0.7 }}
          >
            <a className="button button--primary" href="#projects">
              View my work <ArrowDownRightIcon />
            </a>
            <a className="button button--ghost" href="#contact">
              Get in touch <ArrowRightIcon />
            </a>
          </motion.div>

          <motion.div
            animate={{ opacity: 1 }}
            className="hero-meta"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.52, duration: 0.8 }}
          >
            <span>Facebook · pending</span>
            <span>Email · pending</span>
            <span>Phone · pending</span>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="signal-map"
          initial={{ opacity: 0, scale: 0.96 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden="true" className="signal-map__orb" />
          <div className="signal-map__topline">
            <span>System map / 001</span>
            <span className="live-indicator">Live thinking</span>
          </div>
          <div aria-label="Felix's development process" className="signal-path">
            <div className="signal-node signal-node--problem">
              <span>01</span>
              <strong>Observe</strong>
              <small>Operational friction</small>
            </div>
            <div aria-hidden="true" className="signal-connector signal-connector--one" />
            <div className="signal-node signal-node--logic">
              <span>02</span>
              <strong>Engineer</strong>
              <small>Product + workflow</small>
            </div>
            <div aria-hidden="true" className="signal-connector signal-connector--two" />
            <div className="signal-node signal-node--agent">
              <span>03</span>
              <strong>Automate</strong>
              <small>Agents + safeguards</small>
            </div>
            <div aria-hidden="true" className="signal-connector signal-connector--three" />
            <div className="signal-node signal-node--impact">
              <span>04</span>
              <strong>Improve</strong>
              <small>Measure real value</small>
            </div>
          </div>
          <div className="keyword-console">
            <span>Current focus</span>
            <button
              aria-label="Show next focus area"
              onClick={() => setActiveKeyword((current) => (current + 1) % keywords.length)}
              type="button"
            >
              {keywords[activeKeyword]} <RefreshIcon />
            </button>
          </div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="hero-ticker">
        <div>
          <span>Research</span><i />
          <span>Architecture</span><i />
          <span>Development</span><i />
          <span>Automation</span><i />
          <span>Measurement</span><i />
          <span>Continuous improvement</span><i />
        </div>
      </div>
    </section>
  );
}
