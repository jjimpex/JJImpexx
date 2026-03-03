import Brand from "../models/Brand.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch brands" });
  }
};