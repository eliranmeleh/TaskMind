import express from "express";
import Task from "../db/task.model.js"; // ← זהו ה־Mongoose model האמיתי

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("index.ejs", { tasks });
  } catch (err) {
    console.error("Failed to fetch tasks:", err.message);
    res.status(500).send("Error fetching tasks");
  }
});

// Create new Task
router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const task = new Task({ title });
    await task.save(); // Saves the Task in MongoDB
    res.redirect("/api/tasks");
  } catch (err) {
    console.error("Failed to create task:", err.message);
    res.status(500).send("Error creating task");
  }
});

// Delete Task
router.post("/delete", async (req, res) => {
  const { title } = req.body;
  try {
    await Task.findOneAndDelete({ title });
    res.redirect("/api/tasks");
  } catch (err) {
    console.error("Failed to delete task:", err.message);
    res.status(500).send("Error deleting task");
  }
});

// Update Task
router.post("/task-complete", async (req, res) => {
  const { title, status } = req.body;
  try {
    const task = await Task.findOne({ title });
    if (task) {
      task.status = status === "on" ? "done" : "todo";
      await task.save(); // Saves the task
    }
    res.redirect("/api/tasks");
  } catch (err) {
    console.error("Failed to update task:", err.message);
    res.status(500).send("Error updating task");
  }
});

export default router;
