import mongoose from "mongoose";
export const connectDB = async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/FOOD-DEL", ).then(() =>console.log("DB connected"))
}
