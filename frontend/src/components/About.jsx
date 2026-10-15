import { about, profile } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="eyebrow">01 · about</div>
        <h2 className="section-title">
          The person behind the <span className="accent">code.</span>
        </h2>

        <div className="about-grid">
          <div className="about-text">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div>
            <div className="stat-grid">
              {about.stats.map((s) => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
