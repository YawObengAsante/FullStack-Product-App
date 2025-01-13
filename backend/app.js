import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import ProductRoutes from "./routes/product.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/v1/products", ProductRoutes);

const start = async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log("app is running on PORT " + PORT);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

start();
