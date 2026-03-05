import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/adminCategoryController.js";

import uploadCategories from "../../middleware/uploadCategories.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", uploadCategories.single("icon"), createCategory);
router.put("/:id", uploadCategories.single("icon"), updateCategory);

router.delete("/:id", deleteCategory);

export default router;