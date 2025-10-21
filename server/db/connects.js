import mongoose from "mongoose";

const uri = "mongodb+srv://Mirmir:Aa123456@cluster0.tvyxxcg.mongodb.net/TaskMindDB?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};

export default connectToDB;
