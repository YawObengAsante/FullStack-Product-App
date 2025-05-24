import express, { json } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.js";
import { createTypedRouter } from "@minisylar/express-typed-router";
// import Product from "../models/product.model.js";

// const router = express.Router()
const router = createTypedRouter();

router.get("/", getAllProducts).post("/", createProduct)
router.put('/:id',updateProduct).delete('/:id', deleteProduct)


// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     console.error("Error in fetching Products: ", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

const expressRouter = router.getRouter()

export default expressRouter;
