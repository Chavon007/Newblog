import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected successfully");
  } catch (err) {
    console.error("MongoDB connection error");
  }
}
export default connectDB;
