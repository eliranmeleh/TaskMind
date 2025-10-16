import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import tasksRouter from "./routes/tasks.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Routes
app.use("/api/tasks", tasksRouter);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
