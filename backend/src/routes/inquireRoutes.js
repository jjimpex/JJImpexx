import express from "express";
import Inquire from "../models/Inquire.js";
const router = express.Router();

// Submit inquire
router.post("/", async (req, res) => {
  try {
    const inquire = new Inquire(req.body);
    await inquire.save();
    res.status(201).json({ message: "Submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;