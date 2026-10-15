import { education } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="eyebrow">04 · education</div>
        <h2 className="section-title">
          Academic <span className="accent">background.</span>
        </h2>

        <div className="timeline">
          {education.map((e) => (
            <div className="timeline-item" key={e.title}>
              <div className="timeline-period">{e.period}</div>
              <h3 className="timeline-title">{e.title}</h3>
              <div className="timeline-place">{e.place}</div>
              <div className="timeline-detail">{e.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
