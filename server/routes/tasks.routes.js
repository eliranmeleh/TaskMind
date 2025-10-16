import express from "express";
const router = express.Router();

let tasks = [];
let nextId = 1;

// Render the task list
router.get("/", (req, res) => {
  res.render("index.ejs", { tasks, error: null });
});

// Add a new task
router.post("/", (req, res) => {
  const title = (req.body.title || "").trim();

  if (!title) {
    // Return the same page with an error message
    return res
      .status(400)
      .render("index.ejs", { tasks, error: "Task title is required" });
  }

  // Optional: prevent duplicate titles
  if (tasks.some((t) => t.title.toLowerCase() === title.toLowerCase())) {
    return res
      .status(409)
      .render("index.ejs", { tasks, error: "Task title already exists" });
  }

  tasks.push({ id: nextId++, title, status: "todo" });
  return res.redirect(303, "/api/tasks");
});

// Mark a task as done
router.post("/:id/done", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.redirect(303, "/api/tasks");

  task.status = "done";
  return res.redirect(303, "/api/tasks");
});

// Delete a task
router.post("/:id/delete", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  return res.redirect(303, "/api/tasks");
});

// Optional: return JSON for API usage or fetch()
router.get("/list.json", (req, res) => {
  res.json(tasks);
});

export default router;
