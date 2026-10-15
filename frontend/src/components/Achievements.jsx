import { achievements } from "../data/portfolioData";

export default function Achievements() {
  return (
    <section id="achievements" className="section section-alt">
      <div className="container">
        <div className="eyebrow">05 · achievements</div>
        <h2 className="section-title">
          Wins worth <span className="accent">mentioning.</span>
        </h2>

        <div className="ach-grid">
          {achievements.map((a) => (
            <div className="ach-card" key={a.title}>
              <span className="ach-tag">#{a.tag}</span>
              <h3 className="ach-title">{a.title}</h3>
              <p className="ach-detail">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
