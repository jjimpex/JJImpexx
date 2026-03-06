import express from "express";

import {
  getDashboardStats,
  getRecentProducts
} from "../controllers/dashboardController.js";

const router = express.Router();

/* DASHBOARD */

router.get("/dashboard-stats", getDashboardStats);
router.get("/recent-products", getRecentProducts);

export default router;