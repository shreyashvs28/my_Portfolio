import { profile } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span className="gold">$</span> echo "Built by {profile.name}" —{" "}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}
