# Developer Portfolio — MERN Stack

A single-page portfolio for a student frontend developer / full-stack lead.
Theme: **classic off-white background, black text, gold accents**, with
terminal-style panels in the Hero, Skills, and Projects sections. The
Contact form is fully functional and posts to a real Express + MongoDB API.

```
portfolio-mern/
├── frontend/     React + Vite app (all UI, sections, theme)
└── backend/      Express + MongoDB API (contact form)
```

## Sections

1. **Hero** — animated terminal that "types" out `whoami`, role, location, status.
2. **About** — bio + quick stats.
3. **Skills** — three terminal windows (`frontend`, `backend`, `database-and-tools`)
   showing `npm ls` style output with animated gold progress bars.
4. **Projects** — each project is a mini terminal showing `git clone` / `npm run dev`
   style commands, plus a description card with tech stack tags and links.
5. **Education** — timeline.
6. **Achievements** — tagged cards (leadership, hackathons, competitions, open source).
7. **Contact** — real working form (`POST /api/contact`) that saves to MongoDB
   (with an automatic local-file fallback) and can optionally email you via
   Nodemailer.

## 1. Quick start (local)

You need **Node.js 18+** installed. MongoDB is optional — the backend runs
and the contact form still works even with no database connected.

### Backend

```bash
cd backend
npm install
cp .env.example .env      # edit if you want Mongo + email working
npm run dev                # starts on http://localhost:5000
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env       # optional, defaults already point to localhost:5000
npm run dev                 # starts on http://localhost:5173
```

Open **http://localhost:5173** — the site is live, and the contact form
actually sends data to the backend.

## 2. Make it yours

Edit **one file** to change almost everything (name, role, about text,
skills, projects, education, achievements, socials, email):

```
frontend/src/data/portfolioData.js
```

Colors / theme (off-white, black, gold) live in:

```
frontend/src/index.css   →  the :root { --bg, --ink, --gold, ... } block
```

## 3. Making the contact form fully "live" (MongoDB + email)

By default, if you don't configure anything, submitted messages are still
saved reliably to `backend/data/messages.json`, so the form always works.
To make it production-grade:

1. **MongoDB** — create a free cluster at MongoDB Atlas, copy the
   connection string into `backend/.env` as `MONGO_URI`.
2. **Email notifications** — generate a Gmail App Password
   (https://myaccount.google.com/apppasswords) and set `SMTP_USER`,
   `SMTP_PASS`, and `CONTACT_RECEIVER_EMAIL` in `backend/.env`.

You can view all stored messages anytime at:
`GET http://localhost:5000/api/contact`

## 4. Deployment

- **Backend**: deploy to Render / Railway / Cyclic. Set the same env vars
  from `.env.example` in your host's dashboard.
- **Frontend**: deploy to Vercel / Netlify. Set `VITE_CONTACT_API_URL` to
  your deployed backend's `/api/contact` URL, then `npm run build`.
- Update `CLIENT_ORIGIN` in the backend `.env` to your deployed frontend URL
  so CORS allows it.

## Tech stack

- **Frontend**: React 18, Vite, plain CSS (CSS variables, no framework)
- **Backend**: Node.js, Express, Mongoose (MongoDB), Nodemailer, CORS, dotenv
