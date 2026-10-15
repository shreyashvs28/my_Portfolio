import { useState } from "react";
import { profile, CONTACT_API_URL } from "../data/portfolioData";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: "err", message: "✗ Please fill in name, email and message." });
      return;
    }
    setStatus({ state: "loading", message: "$ sending message..." });
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus({ state: "ok", message: "✓ Message sent — I'll get back to you soon!" });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: "err",
        message: `✗ ${err.message || "Something went wrong. Is the backend running?"}`,
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="eyebrow">06 · contact</div>
        <h2 className="section-title">
          Let's build something <span className="accent">together.</span>
        </h2>
        <p className="section-sub">
          Have a role, project, or just want to talk MERN? The form below hits a real Express
          endpoint — no mailto links.
        </p>

        <div className="contact-grid">
          <div className="terminal">
            <div className="terminal-header">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
              <span className="terminal-title">contact.js — POST /api/contact</span>
            </div>
            <form className="terminal-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">subject (optional)</label>
                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Internship opportunity"
                />
              </div>
              <div className="form-group">
                <label className="form-label">message</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me a bit about the opportunity or project..."
                />
              </div>
              <button className="submit-btn" type="submit" disabled={status.state === "loading"}>
                {status.state === "loading" ? "sending..." : "$ node send-message.js"}
              </button>
              {status.message && (
                <div className={`form-status ${status.state === "ok" ? "ok" : status.state === "err" ? "err" : ""}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          <div className="contact-side">
            <div className="contact-line">
              <span className="k">email</span>
              <span className="v">{profile.email}</span>
            </div>
            <div className="contact-line">
              <span className="k">location</span>
              <span className="v">{profile.location}</span>
            </div>
            <div className="contact-line">
              <span className="k">github</span>
              <span className="v">{profile.socials.github.replace("https://", "")}</span>
            </div>
            <div className="contact-line">
              <span className="k">linkedin</span>
              <span className="v">{profile.socials.linkedin.replace("https://", "")}</span>
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
              Messages are saved to MongoDB (or a local fallback file if no database is
              connected) and optionally forwarded to my inbox via Nodemailer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
