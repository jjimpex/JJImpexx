import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/adminCategoryController.js";

import uploadCategories from "../../middleware/uploadCategories.js";

import { adminAuth } from "../../middleware/adminAuthMiddleware.js";

// const router = express.Router();

const router = express.Router();

router.use(adminAuth);

router.get("/", getCategories);

router.post("/", uploadCategories.single("icon"), createCategory);
router.put("/:id", uploadCategories.single("icon"), updateCategory);

router.delete("/:id", deleteCategory);

export default router;