import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json(categories);
  } catch {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    const { slug } = req.params;
    const { brand, search, sort } = req.query;

    const category = await Category.findOne({ slug, isActive: true });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    /* -----------------------------
       BUILD FILTER
    ----------------------------- */
    const filter = {
      category: category._id,
      isActive: true
    };

    if (brand) {
      filter.brand = brand;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    /* -----------------------------
       SORT
    ----------------------------- */
    let sortOption = {};
    if (sort === "az") sortOption.name = 1;
    if (sort === "za") sortOption.name = -1;

    const products = await Product.find(filter)
      .populate("brand", "name slug")
      .sort(sortOption);

    res.status(200).json({
      category,
      products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category products" });
  }
};