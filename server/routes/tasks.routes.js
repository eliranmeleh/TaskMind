import express from "express";
const router = express.Router();

let tasks = [];
let idCounter = 1;

router.get("/", (req, res) => {
  res.render("index.ejs", { tasks });
});

// Adding a new task
router.post("/", (req, res) => {
  const {title} = req.body;

  const index = tasks.findIndex(t => t.title === title);

  const newTask = {
    id: Date.now(), 
    title,
    status: "todo"
  };

  tasks.push(newTask);
  res.redirect("/api/tasks");
});

// Deleting an existing task
router.post("/delete", (req, res) => {
  const { title } = req.body;
  
  const index = tasks.findIndex(t => t.title === title);
  if (index === -1) {
    res.redirect("/api/tasks");
    return;
  }

  tasks.splice(index, 1);
  res.redirect("/api/tasks");
})

// Updating a task to have a status "done"
router.patch("/", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "The name of the task misses"});
  }

  const index = tasks.findIndex(t => t.title === title);
  if (index === -1) {
    return res.status(404).json({ error: "There is no task with the matching name"});
  }

  tasks[index].status = "done";
  res.status(201).json(tasks[index]);
})

export default router;
