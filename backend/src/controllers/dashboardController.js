import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";

/* ========================= */
/* GET DASHBOARD STATS */
/* ========================= */

export const getDashboardStats = async (req, res) => {

  try {

    const products = await Product.countDocuments();
    const brands = await Brand.countDocuments();
    const categories = await Category.countDocuments();

    res.json({
      products,
      brands,
      categories
    });

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch stats" });

  }

};


/* ========================= */
/* GET RECENT PRODUCTS */
/* ========================= */
export const getRecentProducts = async (req, res) => {
  try {

    const products = await Product
      .find({ isActive: true })   // FILTER
      .populate("brand", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(products);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch products" });

  }
};