import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("brand", "name slug logo")
      .populate("category", "name slug icon");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;

    const products = await Product.find({
      brand: brandId,
      isActive: true
    })
      .populate("brand", "name slug logo")
      .populate("category", "name slug icon");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch brand products" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({
      category: categoryId,
      isActive: true
    })
      .populate("brand", "name slug logo")
      .populate("category", "name slug icon");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category products" });
  }
};
