import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { initDatabase } from "./src/db.js";
import { adminRouter, publicRouter } from "./src/routes.js";

dotenv.config();

const required = ["JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD", "DB_NAME"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key} in backend/.env`);
    process.exit(1);
  }
}

const app = express();
const origins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((item) => item.trim().replace(/\/$/, ""))
  .filter(Boolean);

function originAllowed(origin) {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/$/, "");
  if (origins.includes(cleanOrigin) || origins.includes(origin)) return true;
  try {
    const url = new URL(origin);
    return (
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost" ||
      url.hostname === "surfsyncinfotech.in" ||
      url.hostname.endsWith(".surfsyncinfotech.in") ||
      url.hostname === "surfsyncinfotech.com" ||
      url.hostname.endsWith(".surfsyncinfotech.com")
    );
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (originAllowed(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", publicRouter());
app.use("/api/admin", adminRouter());

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

const port = Number(process.env.PORT || 4000);

initDatabase()
  .then(() => {
    app.listen(port, "127.0.0.1", () => {
      console.log(`Careers API listening on http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.error("Could not connect to MySQL. Check DB_HOST, DB_USER, and DB_PASSWORD in backend/.env");
    console.error(error.message);
    process.exit(1);
  });
