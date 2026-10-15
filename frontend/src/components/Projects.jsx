import React, { useRef, useEffect, useState } from "react";
import Terminal from "./Terminal";
import { projects } from "../data/portfolioData";

export default function Projects() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 980 : false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 980);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Only enable continuous looping on non-mobile so mobile stacks normally
    if (isMobile) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let singleWidth = track.scrollWidth / 2;
    let lastTime = null;
    const speed = 40; // pixels per second

    function onResize() {
      singleWidth = track.scrollWidth / 2;
    }
    window.addEventListener("resize", onResize);

    function step(time) {
      if (pausedRef.current) {
        lastTime = time;
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      if (lastTime == null) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      viewport.scrollLeft += delta * speed;
      if (viewport.scrollLeft >= singleWidth) {
        viewport.scrollLeft -= singleWidth;
      }
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };
  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  const items = isMobile ? projects : [...projects, ...projects];

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div className="eyebrow">03 · projects</div>
        <h2 className="section-title">
          Selected <span className="accent">builds.</span>
        </h2>
        <p className="section-sub">
          A few things I've shipped end to end — clone, install, run.
        </p>

        <div
          className="projects-grid"
          ref={viewportRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="projects-track" ref={trackRef}>
            {items.map((p, idx) => (
              <div className="project-card" key={`${p.name}-${idx}`}>
                <Terminal title={`${p.name} — bash`}>
                  {p.commands.map((line, i) => (
                    <div
                      key={i}
                      className={line.startsWith("$") ? "" : "term-out"}
                      style={{ marginBottom: 4 }}
                    >
                      {line.startsWith("$") ? (
                        <>
                          <span className="prompt">➜ </span>
                          {line.slice(2)}
                        </>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </Terminal>
                <div className="project-info">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  <div className="stack-tags">
                    {p.stack.map((s) => (
                      <span className="stack-tag" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noreferrer">
                      Code ↗
                    </a>
                    <a href={p.live} target="_blank" rel="noreferrer">
                      Live demo ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
