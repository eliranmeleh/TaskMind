import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['todo', 'done'], default: 'todo' }
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
