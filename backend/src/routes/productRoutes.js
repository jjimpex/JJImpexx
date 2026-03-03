import express from "express";
import {
  getAllProducts,
  getProductsByBrand,
  getProductsByCategory
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/brand/:brandId", getProductsByBrand);
router.get("/category/:categoryId", getProductsByCategory);

export default router;