import Terminal from "./Terminal";
import { skills } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="eyebrow">02 · skills</div>
        <h2 className="section-title">
          Run <span className="accent">$ skills --list</span>
        </h2>
        <p className="section-sub">
          Everything below is a package I actually ship with — not a buzzword list.
        </p>

        <div className="skills-grid">
          {skills.map((group) => (
            <Terminal title={`${group.category}.sh`} key={group.category}>
              <div className="term-comment"># {group.command}</div>
              <div className="prompt" style={{ marginBottom: 14 }}>
                ➜ {group.command}
              </div>
              {group.items.map((item) => (
                <div className="skill-item" key={item.name}>
                  <div className="skill-row">
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-pct">{item.level}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </Terminal>
          ))}
        </div>
      </div>
    </section>
  );
}
