import { useEffect, useState } from "react";
import Terminal from "./Terminal";
import { profile } from "../data/portfolioData";

const LINES = [
  { prompt: "who_am_i", output: profile.name },
  { prompt: "cat role.txt", output: profile.role },
  { prompt: "cat location.txt", output: profile.location },
  { prompt: "echo $STATUS", output: "Open to internships & full-stack roles ✓" },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const current = LINES[visibleLines].prompt;
    if (charCount < current.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 35);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setCharCount(0);
    }, 350);
    return () => clearTimeout(t);
  }, [charCount, visibleLines]);

  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Student · Developer · Leader</div>
          <h1 className="hero-name">
            Hi, I build. I ship. <br />
            <span style={{ color: "var(--gold)" }}> I scale.</span>
          </h1>
          <p className="hero-role">
            <span className="gold">$</span> {profile.role}
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              ./view-projects.sh
            </a>
            <a className="btn btn-ghost" href="#contact">
              ./get-in-touch.sh
            </a>
          </div>
          <div className="hero-socials">
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer">
              Twitter ↗
            </a>
          </div>
        </div>

        <Terminal title="hero.sh — zsh">
          {LINES.map((line, i) => {
            if (i > visibleLines) return null;
            const isCurrent = i === visibleLines;
            const promptText = isCurrent ? line.prompt.slice(0, charCount) : line.prompt;
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div>
                  <span className="prompt">➜ ~ </span>
                  {promptText}
                  {isCurrent && <span className="cursor-blink" />}
                </div>
                {i < visibleLines && <div className="term-out">{line.output}</div>}
              </div>
            );
          })}
          {visibleLines >= LINES.length && (
            <div>
              <span className="prompt">➜ ~ </span>
              <span className="cursor-blink" />
            </div>
          )}
        </Terminal>
      </div>
    </section>
  );
}
