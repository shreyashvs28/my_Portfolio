/**
 * ChatBot.jsx — a friendly floating robot chatbot for the portfolio.
 *
 * HOW TO USE:
 * 1. Save this file at:  frontend/src/components/ChatBot.jsx
 * 2. In frontend/src/App.jsx, add:
 *      import ChatBot from "./components/ChatBot";
 *    and render <ChatBot /> once, anywhere inside the returned JSX
 *    (it's a fixed-position floating widget, so placement doesn't matter).
 * 3. That's it — no extra CSS files, no extra packages. Everything
 *    (styles + logic) lives in this single file.
 *
 * It pulls real answers from your existing portfolioData.js, so if you
 * update your name/skills/projects there, the bot's answers update too.
 * If that import isn't found for some reason, it quietly falls back to
 * generic placeholder answers so the component never crashes.
 */

import { useEffect, useRef, useState } from "react";

// Pulls real content from your existing portfolio data file so the bot's
// answers always match what's on the page. This import assumes ChatBot.jsx
// lives at frontend/src/components/ChatBot.jsx (same folder as your other
// section components) — adjust the path below if you place it elsewhere.
// If you don't have this file, delete the import and use the FALLBACK
// object right below it instead.
import {
  profile as portfolioProfile,
  skills as portfolioSkills,
  projects as portfolioProjects,
  achievements as portfolioAchievements,
  education as portfolioEducation,
} from "../data/portfolioData";

const FALLBACK_PROFILE = {
  name: "Your Name",
  role: "Frontend Developer • Full-Stack (MERN) Lead",
  email: "you@example.com",
  location: "Your City",
  socials: { github: "#", linkedin: "#" },
};

const profile = portfolioProfile || FALLBACK_PROFILE;
const skills = portfolioSkills || [];
const projects = portfolioProjects || [];
const achievements = portfolioAchievements || [];
const education = portfolioEducation || [];

const firstName = profile.name.split(" ")[0];

const QUICK_REPLIES = ["Skills", "Projects", "Education", "Achievements", "Hire me", "Contact"];

function botTextFor(rawInput) {
  const input = rawInput.toLowerCase();

  if (/\b(hi|hello|hey|yo|sup)\b/.test(input)) {
    return `Beep boop 🤖 Hello! I'm ${firstName}'s portfolio bot. Ask me about skills, projects, education, achievements, or how to get in touch.`;
  }

  if (/(skill|tech|stack|know|language|framework)/.test(input)) {
    if (skills.length) {
      const lines = skills
        .map((g) => `• ${g.category.replace(/-/g, " ")}: ${g.items.map((i) => i.name).join(", ")}`)
        .join("\n");
      return `Here's what's in ${firstName}'s stack:\n${lines}`;
    }
    return `${firstName} works across the MERN stack — React, Node.js, Express, and MongoDB.`;
  }

  if (/(project|build|portfolio|work|app|github)/.test(input)) {
    if (projects.length) {
      const lines = projects.map((p) => `• ${p.title} — ${p.description}`).join("\n");
      return `A few things ${firstName} has shipped:\n${lines}`;
    }
    return `${firstName} has built several full-stack MERN apps — check the Projects section above!`;
  }

  if (/(educat|degree|college|university|study|school)/.test(input)) {
    if (education.length) {
      const lines = education.map((e) => `• ${e.title} — ${e.place} (${e.period})`).join("\n");
      return `Education:\n${lines}`;
    }
    return `${firstName} is currently pursuing a degree in Computer Science.`;
  }

  if (/(achieve|award|win|hackathon|competition|leader)/.test(input)) {
    if (achievements.length) {
      const lines = achievements.map((a) => `• ${a.title} — ${a.detail}`).join("\n");
      return `Some highlights:\n${lines}`;
    }
    return `${firstName} has led teams and placed in several hackathons.`;
  }

  if (/(hire|job|available|freelance|intern|opportunit)/.test(input)) {
    return `${firstName} is currently open to internships and full-stack roles! The fastest way to reach out is the Contact section, or email ${profile.email} directly.`;
  }

  if (/(contact|email|reach|message|touch|linkedin|github)/.test(input)) {
    return `You can reach ${firstName} at ${profile.email}, through the Contact form above, or on GitHub/LinkedIn (links in the navbar).`;
  }

  if (/(location|where|based|live|city)/.test(input)) {
    return `${firstName} is based in ${profile.location}.`;
  }

  if (/(thank|thanks|cool|nice|awesome|great)/.test(input)) {
    return `Glad that helped! Anything else — skills, projects, or how to get in touch?`;
  }

  if (/(who are you|what are you|bot|robot)/.test(input)) {
    return `I'm a small rule-based bot living in ${firstName}'s portfolio 🤖 — I can answer questions about skills, projects, education, achievements, and contact info.`;
  }

  return `Hmm, I'm not sure about that one 🤔 Try asking about "skills", "projects", "education", "achievements", or "contact".`;
}

function RobotAvatar({ talking }) {
  return (
    <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="6" width="6" height="10" rx="3" fill="#b8892b" />
      <circle cx="13" cy="5" r="4" fill="#e0ac3f" className="cb-antenna-dot" />
      <rect x="8" y="16" width="48" height="40" rx="14" fill="#17150f" stroke="#e0ac3f" strokeWidth="2" />
      <rect x="16" y="26" width="14" height="10" rx="5" fill="#f2ecda" className={talking ? "cb-eye-blink" : ""} />
      <rect x="34" y="26" width="14" height="10" rx="5" fill="#f2ecda" className={talking ? "cb-eye-blink" : ""} />
      <rect x="22" y="42" width="20" height="5" rx="2.5" fill="#e0ac3f" className={talking ? "cb-mouth-talk" : ""} />
    </svg>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: `Beep boop 🤖 Hi, I'm ${firstName}'s portfolio bot! Ask me about skills, projects, education, achievements, or how to hire ${firstName}.`,
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    const delay = 500 + Math.min(trimmed.length * 12, 900);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: botTextFor(trimmed) }]);
    }, delay);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <style>{`
        .cb-launcher {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #17150f;
          border: 2px solid #e0ac3f;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px -8px rgba(23,21,15,0.55), 0 0 0 6px rgba(224,172,63,0.12);
          animation: cb-float 3s ease-in-out infinite;
          transition: transform 0.15s ease;
        }
        .cb-launcher:hover { transform: scale(1.08); }
        @keyframes cb-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .cb-antenna-dot { animation: cb-pulse 1.4s ease-in-out infinite; transform-origin: 13px 5px; }
        @keyframes cb-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .cb-eye-blink { animation: cb-blink 2.6s ease-in-out infinite; transform-origin: center; }
        @keyframes cb-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.15); }
        }
        .cb-mouth-talk { animation: cb-talk 0.35s ease-in-out infinite alternate; transform-origin: center; }
        @keyframes cb-talk {
          from { transform: scaleX(1); }
          to { transform: scaleX(0.6); }
        }
        .cb-window {
          position: fixed;
          bottom: 98px;
          right: 24px;
          z-index: 999;
          width: 340px;
          max-width: calc(100vw - 32px);
          height: 460px;
          max-height: calc(100vh - 140px);
          background: #f7f4ec;
          border-radius: 14px;
          border: 1px solid #ddd5c0;
          box-shadow: 0 24px 60px -16px rgba(23,21,15,0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          animation: cb-pop 0.18s ease-out;
        }
        @keyframes cb-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cb-header {
          background: #17150f;
          color: #f2ecda;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 2px solid #e0ac3f;
        }
        .cb-header-title { font-size: 13px; font-weight: 700; }
        .cb-header-sub { font-size: 11px; color: #9c9787; display: flex; align-items: center; gap: 5px; }
        .cb-dot-live {
          width: 7px; height: 7px; border-radius: 50%; background: #8fbf6c;
          box-shadow: 0 0 0 0 rgba(143,191,108,0.7);
          animation: cb-live 1.8s infinite;
        }
        @keyframes cb-live {
          0% { box-shadow: 0 0 0 0 rgba(143,191,108,0.5); }
          70% { box-shadow: 0 0 0 6px rgba(143,191,108,0); }
          100% { box-shadow: 0 0 0 0 rgba(143,191,108,0); }
        }
        .cb-close {
          margin-left: auto;
          background: none;
          border: none;
          color: #9c9787;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          padding: 4px;
        }
        .cb-close:hover { color: #e0ac3f; }
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-image: radial-gradient(circle at 1px 1px, rgba(23,21,15,0.05) 1px, transparent 0);
          background-size: 22px 22px;
        }
        .cb-msg {
          max-width: 84%;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 12.5px;
          line-height: 1.55;
          white-space: pre-line;
        }
        .cb-msg.bot {
          align-self: flex-start;
          background: #17150f;
          color: #f2ecda;
          border-bottom-left-radius: 3px;
        }
        .cb-msg.user {
          align-self: flex-end;
          background: #e0ac3f;
          color: #17150f;
          border-bottom-right-radius: 3px;
          font-weight: 500;
        }
        .cb-typing {
          align-self: flex-start;
          background: #17150f;
          padding: 10px 14px;
          border-radius: 10px;
          border-bottom-left-radius: 3px;
          display: flex;
          gap: 4px;
        }
        .cb-typing span {
          width: 5px; height: 5px; border-radius: 50%;
          background: #e0ac3f;
          animation: cb-typing-bounce 1s infinite;
        }
        .cb-typing span:nth-child(2) { animation-delay: 0.15s; }
        .cb-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cb-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .cb-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 0 14px 10px;
        }
        .cb-chip {
          font-size: 11px;
          background: #efe9db;
          border: 1px solid #ddd5c0;
          color: #17150f;
          padding: 5px 10px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .cb-chip:hover { background: #e0ac3f; border-color: #e0ac3f; }
        .cb-input-row {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid #ddd5c0;
          background: #f7f4ec;
        }
        .cb-input {
          flex: 1;
          border: 1px solid #ddd5c0;
          background: #fff;
          border-radius: 8px;
          padding: 9px 11px;
          font-family: inherit;
          font-size: 12.5px;
          outline: none;
          color: #17150f;
        }
        .cb-input:focus { border-color: #e0ac3f; }
        .cb-send {
          background: #17150f;
          color: #e0ac3f;
          border: none;
          border-radius: 8px;
          padding: 0 14px;
          font-family: inherit;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }
        .cb-send:hover { opacity: 0.85; }
        @media (max-width: 420px) {
          .cb-window { right: 12px; left: 12px; width: auto; bottom: 90px; }
          .cb-launcher { right: 16px; bottom: 16px; }
        }
      `}</style>

      {open && (
        <div className="cb-window">
          <div className="cb-header">
            <RobotAvatar talking={typing} />
            <div>
              <div className="cb-header-title">{firstName}'s Bot</div>
              <div className="cb-header-sub">
                <span className="cb-dot-live" /> online now
              </div>
            </div>
            <button className="cb-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="cb-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`cb-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="cb-typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="cb-chips">
            {QUICK_REPLIES.map((q) => (
              <button key={q} className="cb-chip" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <form className="cb-input-row" onSubmit={handleSubmit}>
            <input
              className="cb-input"
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="cb-send" type="submit">
              Send
            </button>
          </form>
        </div>
      )}

      <div className="cb-launcher" onClick={() => setOpen((o) => !o)} title="Chat with my bot">
        <RobotAvatar talking={false} />
      </div>
    </>
  );
}
