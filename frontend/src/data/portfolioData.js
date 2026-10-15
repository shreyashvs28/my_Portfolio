// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to make the portfolio yours. Nothing else in
// src/ needs to change for basic customization.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Shreyash Vijay Shinde",
  role: "Frontend Developer • Full-Stack Developer • AWS Student Builder Group Leader • Cloud & DevOps Enthusiast",
  tagline: "I build fast, accessible interfaces and full-stack applications, while exploring Cloud & DevOps by taking projects from code to production.",
  location: "Pune, Maharashtra, India",
  email: "shreyashvs2809@gmail.com",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/shreyashvs28",
    linkedin: "https://www.linkedin.com/in/shreyashvshinde",
    twitter: "https://x.com/Shreyashvs28",
  },
};

export const about = {
  paragraphs: [
    "I'm a pre-final-year Computer Engineering student who likes building things for the web — from polished interfaces to the APIs and infrastructure behind them.",
    "I started with frontend development and have been expanding into full-stack development, taking projects from idea to deployment. I'm particularly interested in understanding what happens beyond the code, which is why I'm currently exploring Cloud & DevOps through hands-on projects.",
    "Outside of coding, I lead the AWS Student Builders Group at my college, collaborate with student developers and learn by building, shipping and figuring things out along the way.",
  ],
  stats: [
    { label: "Years coding", value: "3+" },
    { label: "Projects shipped", value: "8+" },
    { label: "Team members led", value: "35" },
    { label: "Coffee, Bugs", value: "∞" },
  ],
};

export const skills = [
  {
    category: "Technical Skills",
    command: "npm ls technical_skills --depth=0",
    items: [
      { name: "React.js", level: 96 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Node.js", level: 95 },
      { name: "Express.js", level: 92 },
      { name: "MongoDB / Mongoose", level: 90},
    ],
  },
  {
    category: "Cloud & Tools",
    command: "npm ls cloud&tools --depth=0",
    items: [
      { name: "AWS", level: 94 },
      { name: "Docker", level: 88 },
      { name: "Git / GitHub", level: 97 },
      { name: "CI/CD", level: 92 },
      { name: "Cloud Deployment", level: 94 },
    ],
  },
  {
    category: "Beyond Code",
    command: "npm ls beyond_code --depth=0",
    items: [
      { name: "Leadership", level: 97 },
      { name: "Team Collaboration", level: 94 },
      { name: "Project Ownership", level: 89 },
      { name: "Community Management", level: 90 },
      { name: "Communication", level: 92 },
    ],
  },
];

export const projects = [
  {
    name: "notes-ai-app",
    title: "NoteAI — AI-Powered Notes",
    /* description:
      "Full-stack AI notes platform with rich-text editing, auto-save, organization, real-time updates, file uploads, and AI-powered tools for summarizing, tagging, rewriting, flashcards, and chatting with notes.",
     */ stack: ["React", "Node.js", "Express", "MongoDB", "AI", "Socket.io"],
    github: "https://github.com/shreyashvs28/notes-ai-app",
    live: "https://notes-ai-app-ten.vercel.app",
    commands: [
      "$ git clone https://github.com/shreyashvs28/notes-ai-app.git",
      "$ cd notes-ai-app && npm install",
      "$ cd backend && npm run dev",
      "$ cd ../frontend && npm run dev",
    ],
  },
  {
    name: "finance_app",
    title: "FinanceOS — Personal Finance Assistant",
    /* description:
      "Full-stack personal finance platform for tracking income, expenses, budgets, savings goals, recurring transactions, and financial insights through a responsive dashboard.",
     */ stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Recharts"],
    github: "https://github.com/shreyashvs28/finance_app",
    live: "https://finance-app-lemon-beta.vercel.app/",
    commands: [
      "$ git clone https://github.com/shreyashvs28/finance_app.git",
      "$ cd finance_app && npm install",
      "$ cd backend && npm run dev",
      "$ cd ../frontend && npm run dev",
    ],
  },
  {
    name: "smart_quiz",
    title: "QuizMind AI — Adaptive Quiz App",
    /*description:
      "AI-powered quiz platform that generates questions dynamically and adapts difficulty based on performance, with authentication, quiz history, detailed reports, and personalized study insights.",
   */ stack: ["React", "Node.js", "Express", "MongoDB", "Groq", "JWT"],
    github: "https://github.com/shreyashvs28/smart_quiz",
    live: "https://smart-quiz-eosin.vercel.app/",
    commands: [
      "$ git clone https://github.com/shreyashvs28/smart_quiz.git",
      "$ cd smart_quiz && npm install",
      "$ cd backend && npm run dev",
      "$ cd ../frontend && npm run dev",
    ],
  },
  {
    name: "Cosmos-Atlas",
    title: "Cosmos Atlas — Space Exploration App",
    /*description:
      "Interactive space exploration app for visualizing celestial objects, missions, and astronomical data with a modern UI.",
    */ stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Three.js"],
    github: "https://github.com/shreyashvs28/Cosmos-Atlas",
    live: "https://cosmos-atlas-smoky.vercel.app/",
    commands: [
      "$ git clone https://github.com/shreyashvs28/Cosmos-Atlas.git",
      "$ cd Cosmos-Atlas && npm install",
      "$ cd backend && npm run dev",
      "$ cd ../frontend && npm run dev",
    ],
  },
  {
    name: "Split-Expense-Manager",
    title:"SplitExpense — Smart Expense Management",
    /*description:
      "Full-stack expense management platform for tracking shared expenses, splitting bills, managing groups, settling balances and visualizing spending through a responsive dashboard.",
    */ stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Recharts"],
    github: "https://github.com/shreyashvs28/Split-Expense-Manager",
    live: "https://split-expanse-manager-ten.vercel.app/",
    commands: [
      "$ git clone https://github.com/shreyashvs28/Split-Expense-Manager.git",
      "$ cd Split-Expense-Manager && npm install",
      "$ cd backend && npm run dev",
      "$ cd ../frontend && npm run dev",
    ],
  },
  {
    name: "Periodic Table Explorer",
    title: "Periodic Table Explorer — Interactive Chemistry App",
    /*description:
      "Interactive app for exploring the periodic table with detailed information about elements, their properties, and real-world applications.",
    */ stack: ["HTML", "tailwind CSS", "Javascript","JSON","Github"],
    github: "https://github.com/shreyashvs28/periodic-table",
    live: "https://shreyashvs28.github.io/periodic-table/",
    commands: [
      "$ git clone https://github.com/shreyashvs28/periodic-table.git",
      "$ cd periodic-table && npm install",
      "$ cd ../frontend && npm run dev",
    ],
  },
  {
    name: "EV Charging Station Finder",
    title: "EV Charging Station Finder — Find Nearby Electric Vehicle Charging Stations",
    /*description:
      "Full-stack app for locating and viewing information about nearby EV charging stations with real-time availability and pricing details.",
    */ stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Recharts"],
    github: "https://github.com/shreyashvs28/EV-Charging-Station-Finder",
    live: "#",
    commands: ["working on this project, will be updated soon...",
      "$ frontend done ",
      "$ backend is under development, will be updated soon...",
      "$ under development, will be updated soon...",
    ],
  },
];

export const education = [
  {
    period: "2024 — 2028*",
    title: "B.Tech in Computer Engineering",
    place: "All India Shri Shivaji Memorial Society's Institute of Information Technology, Pune",
    detail: "Learning by building, experimenting and shipping real-world projects.",
  },
  {
    period: "2022 — 2024",
    title: "Higher Secondary Education",
    place: "Abasaheb Kakade Junior College, Shevgaon",
    detail: "Scored 82.33% · My first step into coding",
  },
  {
    period: "2016 — 2022",
    title: "Secondary Education",
    place: "Residential High School, Shevgaon",
    detail: "Scored 90.40% · Building the foundations — exploring mathematics, science, creativity and curiosity through school.",
  },
];

export const achievements = [
  {
    title: "AWS Student Builders Group Lead",
    detail: "Selected to lead the AWS Student Builders Group at college, driving technical initiatives, collaboration and student engagement.",
    tag: "leadership",
  },
  {
    title: "AWS Certified / Learning Journey",
    detail: "Building practical cloud knowledge through AWS fundamentals, hands-on labs and working with core AWS services.",
    tag: "Learning",
  },
  {
    title: "Stepping Into Cloud",
    detail: "Completed foundational AWS learning and started applying cloud concepts through real projects, deployment and experimentation.",
    tag: "Projects",
  },
  {
    title: "Technical Community Leadership",
    detail: "Working with students through AWS SBG initiatives, technical sessions, workshops and collaborative projects.",
    tag: "Community Leadership",
  },
];

// Set this to your deployed backend URL in production, e.g.
// "https://your-backend.onrender.com/api/contact"
export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL || "http://localhost:5000/api/contact";
