import express from "express";

const router = express.Router();

let tasks = [];
let idCounter = 1;

router.get("/", (req, res) => {
  res.json({ msg: "📋 All tasks will be listed here" });
});

router.post("/", (req, res) => {
  const { title } = req.body; 
  if (!title) {
    return res.status(400).json({ error: "חסר שם משימה" });
  }

  const newTask = {
    id: Date.now(), 
    title,
    status: "todo"
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});


export default router;
