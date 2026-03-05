// import express from "express";
// import {
//   getBrands,
//   createBrand,
//   updateBrand,
//   deleteBrand
// } from "../controllers/adminBrandController.js";

// const router = express.Router();

// // ❌ REMOVE any auth middleware here

// router.get("/", getBrands);
// router.post("/", createBrand);
// router.put("/:id", updateBrand);
// router.delete("/:id", deleteBrand);

// export default router;

import express from "express";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
} from "../controllers/adminBrandController.js";

import upload from "../../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getBrands);

router.post("/", upload.single("logo"), createBrand);

router.put("/:id", upload.single("logo"), updateBrand);

router.delete("/:id", deleteBrand);

export default router;