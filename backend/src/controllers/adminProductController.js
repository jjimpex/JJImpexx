// import Product from "../models/Product.js";

// /* -------------------------
//    CREATE PRODUCT
// ------------------------- */
// export const createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// /* -------------------------
//    GET ALL PRODUCTS (ADMIN)
// ------------------------- */
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("brand", "name slug")
//       .populate("category", "name slug");

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* -------------------------
//    GET SINGLE PRODUCT (EDIT)
// ------------------------- */
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("brand")
//       .populate("category");

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* -------------------------
//    UPDATE PRODUCT
// ------------------------- */
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// /* -------------------------
//    SOFT DELETE PRODUCT
// ------------------------- */
// export const deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndUpdate(req.params.id, { isActive: false });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {

  try {

    const products = await Product.find({ isActive: true })
      .populate("brand", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch products" });

  }
};



export const createProduct = async (req, res) => {
  try {

    const { name, brand, category } = req.body;

    const images = req.files?.map((file) => ({
      url: file.path,
      publicId: file.filename
    })) || [];

    const product = await Product.create({
      name,
      slug: slugify(name, { lower: true }),
      brand: brand || null,
      category,
      images
    });

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
};



export const updateProduct = async (req, res) => {
  try {

    const { name, brand, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.slug = slugify(name, { lower: true });
    product.brand = brand || null;
    product.category = category;

    if (req.files && req.files.length > 0) {

      const images = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename
      }));

      product.images = images;
    }

    await product.save();

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};


export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    await Product.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Delete failed" });

  }

};



/* dropdown data */

export const getProductFormData = async (req, res) => {

  try {

    const brands = await Brand.find({ isActive: true }).sort({ name: 1 });

    const categories = await Category.find({ isActive: true }).sort({ name: 1 });

    res.json({ brands, categories });

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch form data" });

  }

};