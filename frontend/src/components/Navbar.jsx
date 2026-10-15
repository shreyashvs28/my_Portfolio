import { profile } from "../data/portfolioData";

const links = [
  { num: "01", label: "about", href: "#about" },
  { num: "02", label: "skills", href: "#skills" },
  { num: "03", label: "projects", href: "#projects" },
  { num: "04", label: "education", href: "#education" },
  { num: "05", label: "achievements", href: "#achievements" },
  { num: "06", label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <span className="bracket">&lt;</span>
          {profile.name.split(" ")[0]}
          <span className="bracket">/&gt;</span>
        </a>
        <nav>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>
                  <span className="num">{l.num}.</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="nav-cta" href="#contact">
          say_hello()
        </a>
      </div>
    </header>
  );
}
