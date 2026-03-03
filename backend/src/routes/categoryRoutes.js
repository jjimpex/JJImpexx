// // import express from "express";
// // import { getAllCategories } from "../controllers/categoryController.js";

// // const router = express.Router();

// // router.get("/", getAllCategories);

// // export default router;

// import express from "express";
// import {
//   getAllCategories,
//   getCategoryWithProducts
// } from "../controllers/categoryController.js";

// const router = express.Router();

// router.get("/", getAllCategories);
// router.get("/:slug", getCategoryWithProducts);

// export default router;


import express from "express";
import {
  getAllCategories,
  getCategoryProducts
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:slug/products", getCategoryProducts);

export default router;