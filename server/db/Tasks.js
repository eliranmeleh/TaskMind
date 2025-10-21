import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the structure of a Task document in MongoDB
const taskSchema = new Schema ({

  title: { 
    type: String, 
    required: true  
  },

  status: { 
    type: String,
    required: true,  
    enum: ['todo', 'done'], 
    default: 'todo' 
  }

});

// Create a Task model to interact with the 'tasks' collection
const Task = mongoose.model("Task", taskSchema);
export default Task;
