import express from "express";

const app = express();
const port = 4000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

