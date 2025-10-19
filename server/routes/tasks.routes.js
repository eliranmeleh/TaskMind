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
router.post("/task-complete", (req, res) => {
  const { title, status } = req.body;

  const index = tasks.findIndex(t => t.title === title);

  if(status === "on")
    tasks[index].status = "done";
  else {
    tasks[index].status = "todo";
  }

  res.redirect("/api/tasks");
})

export default router;
