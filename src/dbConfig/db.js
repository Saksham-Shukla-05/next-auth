import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
    });

    process.exit(); //there are code as well to exit the db
  } catch (error) {
    console.log(error, "Error While connecting to DB", error);
  }
}
