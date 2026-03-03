import express from "express";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET all brands
router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});

// ❌ THIS IS MISSING OR WRONG — add this
router.get("/:slug", async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const products = await Product.find({ brand: brand._id });

    res.json({ brand, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;