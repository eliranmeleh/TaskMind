import express from "express";

import tasksRouter from "./routes/tasks.routes.js";

const app = express();
app.use(express.json()); // ⬅️ שורה קריטית!

const port = 4000;


app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use("/api/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

