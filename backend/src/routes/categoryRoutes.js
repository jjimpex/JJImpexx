import express from "express";
import {
  getAllCategories,
  getCategoryProducts
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:slug/products", getCategoryProducts);

export default router;