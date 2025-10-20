import express from "express";
import bodyParser from "body-parser";

import tasksRouter from "./routes/tasks.routes.js";
import connectToDB from "./db/connects.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

const port = 4000;

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use("/api/tasks", tasksRouter);


