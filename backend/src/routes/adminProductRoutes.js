// import express from "express";
// import { adminAuth } from "../../middleware/adminAuthMiddleware.js";
// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct
// } from "../controllers/adminProductController.js";

// const router = express.Router();

// /* 🔐 Protect all admin product routes */
// router.use(adminAuth);

// /* ------------------------
//    PRODUCT CRUD (ADMIN)
// ------------------------ */

// // CREATE product
// router.post("/", createProduct);

// // READ all products (admin: active + inactive)
// router.get("/", getProducts);

// // READ single product (for edit page)
// router.get("/:id", getProductById);

// // UPDATE product
// router.put("/:id", updateProduct);

// // SOFT DELETE product (isActive = false)
// router.delete("/:id", deleteProduct);

// export default router;


import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductFormData
} from "../controllers/adminProductController.js";

import uploadProducts from "../../middleware/uploadProducts.js";

import { adminAuth } from "../../middleware/adminAuthMiddleware.js";

// const router = express.Router();

const router = express.Router();

router.use(adminAuth);

router.get("/", getProducts);

router.get("/form-data", getProductFormData);

router.post(
  "/",
  uploadProducts.array("images", 10),
  createProduct
);

router.put(
  "/:id",
  uploadProducts.array("images", 10),
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;