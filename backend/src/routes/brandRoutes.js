// import express from "express";
// import Brand from "../models/Brand.js";
// import Product from "../models/Product.js";

// const router = express.Router();

// // GET all brands
// router.get("/", async (req, res) => {
//   const brands = await Brand.find();
//   res.json(brands);
// });

// // ❌ THIS IS MISSING OR WRONG — add this
// router.get("/:slug", async (req, res) => {
//   try {
//     const brand = await Brand.findOne({ slug: req.params.slug });

//     if (!brand) {
//       return res.status(404).json({ message: "Brand not found" });
//     }

//     const products = await Product.find({ brand: brand._id });

//     res.json({ brand, products });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;


import express from "express";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET all active brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ name: 1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single brand + its products
router.get("/:slug", async (req, res) => {
  try {
    const brand = await Brand.findOne({
      slug: req.params.slug,
      isActive: true
    });

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