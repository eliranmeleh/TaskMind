import express from "express";
import Task from "../db/Tasks.js"; 

const router = express.Router();

// Route to fetch and display all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Gathers all of the tasks from MongoDB
    res.render("index.ejs", { tasks }); // Send all of the tasks to the html file
  } catch (err) {
    console.error("Failed to fetch tasks:", err.message);
    res.status(500).send("Error fetching tasks");
  }
});

// Route to add a new task to MongoDB
router.post("/", async (req, res) => {
  const { title } = req.body;
    try {
    // Checking whether the title already exists
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      const tasks = await Task.find();

      return res.render("index.ejs", {
        tasks,
        error: {
          type: "duplicate",
          message: "Task already exists!"}
      });
    }
    const task = new Task({ title }); // Status will be 'todo' by default
    await task.save(); // Saves the Task in MongoDB
    res.redirect("/api/tasks"); // Load the page again
  } catch (err) {
    console.error("Failed to create task:", err.message);
    res.status(500).send("Error creating task");
  }
});

// Route to delete a task by title 
router.post("/delete", async (req, res) => {
  const { title } = req.body;
  try {
    // Checking whether there's this title
    const existingTask = await Task.findOne({ title });
    if (!existingTask) {
      const tasks = await Task.find();

      return res.render("index.ejs", {
        tasks,
        error: {
          type: "not exists",
          message: "Task doesn't exist!"}
      });
    }

    await Task.findOneAndDelete({ title });
    res.redirect("/api/tasks");
  } catch (err) {
    console.error("Failed to delete task:", err.message);
    res.status(500).send("Error deleting task");
  }
});

// Route to update a task by the status 
router.post("/task-complete", async (req, res) => {
  const { title, status } = req.body;
  try {
    const task = await Task.findOne({ title });
    if (task) {
      task.status = status === "on" ? "done" : "todo"; // Checks whether the checkbox is checked
      await task.save(); // Saves the task with the new updated status
    }
    res.redirect("/api/tasks");
  } catch (err) {
    console.error("Failed to update task:", err.message);
    res.status(500).send("Error updating task");
  }
});

export default router;
