const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// ---- Gmail transporter (created lazily so .env is always loaded first) ----
let transporter = null;
function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  if (!user || !pass) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return transporter;
}

// ---- tiny in-memory rate limit: 5 messages / 15 min / IP (stops spam) ----
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= 5) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body || {};

    // honeypot: real users never fill this hidden field, bots do
    if (website) return res.status(201).json({ ok: true, message: "Message sent." });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Name, email and message are required." });
    }
    if (!EMAIL_RE.test(String(email))) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }
    if (rateLimited(req.ip)) {
      return res.status(429).json({ ok: false, error: "Too many messages. Please try again in a few minutes." });
    }

    const mailer = getTransporter();
    if (!mailer) {
      console.error("[mail] Gmail credentials are not configured.");
      return res.status(500).json({ ok: false, error: "Email service is not configured on the server." });
    }

    const cleanName = String(name).trim().slice(0, 120);
    const cleanEmail = String(email).trim().slice(0, 160);
    const cleanSubject = (subject ? String(subject).trim() : "").slice(0, 200) || "New message";
    const cleanMessage = String(message).trim().slice(0, 4000);

    await mailer.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER,
      replyTo: `"${cleanName.replace(/"/g, "")}" <${cleanEmail}>`, // hit Reply in Gmail -> goes to the visitor
      subject: `[Portfolio] ${cleanSubject} — ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\n\n${cleanMessage}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;border:1px solid #ddd5c0;border-radius:8px;overflow:hidden">
          <div style="background:#17150f;color:#e0ac3f;padding:14px 18px;font-weight:bold">New portfolio message</div>
          <div style="padding:18px;color:#17150f;line-height:1.6">
            <p><b>Name:</b> ${esc(cleanName)}</p>
            <p><b>Email:</b> <a href="mailto:${esc(cleanEmail)}">${esc(cleanEmail)}</a></p>
            <p><b>Subject:</b> ${esc(cleanSubject)}</p>
            <hr style="border:none;border-top:1px solid #ddd5c0"/>
            <p style="white-space:pre-wrap">${esc(cleanMessage)}</p>
          </div>
        </div>`,
    });

    return res.status(201).json({ ok: true, message: "Message sent to my inbox!" });
  } catch (err) {
    console.error("[mail] Send failed:", err.message);
    return res.status(500).json({ ok: false, error: "Could not send the message right now. Please try again later." });
  }
});

module.exports = router;
