require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.set("trust proxy", 1); // needed on Render/Railway so the rate limit sees real visitor IPs
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    status: "running",
    mailConfigured: Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
    time: new Date().toISOString(),
  });
});

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`[server] Portfolio API running on http://localhost:${PORT}`);
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn(
      "[mail] GMAIL_USER / GMAIL_APP_PASSWORD missing in .env — the contact form will return an error until they are set."
    );
  }
});