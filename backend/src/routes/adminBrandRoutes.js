import express from "express";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
} from "../controllers/adminBrandController.js";

import uploadBrands from "../../middleware/uploadMiddleware.js";
import { adminAuth } from "../../middleware/adminAuthMiddleware.js";

// const router = express.Router();

const router = express.Router();

router.use(adminAuth);


router.get("/", getBrands);

router.post("/", uploadBrands.single("logo"), createBrand);

router.put("/:id", uploadBrands.single("logo"), updateBrand);

router.delete("/:id", deleteBrand);

export default router;

