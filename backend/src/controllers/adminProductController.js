import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";


/* -------------------------
   GET PRODUCTS
------------------------- */

export const getProducts = async (req, res) => {
  try {

    const products = await Product.find({ isActive: true })
      .populate("brand", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


/* -------------------------
   CREATE PRODUCT
------------------------- */

export const createProduct = async (req, res) => {
  try {

    const { name, brand, category } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const images = req.files?.map((file) => ({
      url: file.path,
      publicId: file.filename
    })) || [];

    const existingProduct = await Product.findOne({ slug });

    /* ✅ If product exists but deleted -> Reactivate */
    if (existingProduct) {

      if (!existingProduct.isActive) {

        /* delete old images if exist */
        for (const img of existingProduct.images) {
          if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId);
          }
        }

        existingProduct.name = name;
        existingProduct.slug = slug;
        existingProduct.brand = brand || null;
        existingProduct.category = category;
        existingProduct.images = images;
        existingProduct.isActive = true;

        await existingProduct.save();

        return res.json(existingProduct);
      }

      return res.status(400).json({
        message: "Product already exists"
      });
    }

    /* create new product */

    const product = await Product.create({
      name,
      slug,
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



/* -------------------------
   UPDATE PRODUCT
------------------------- */

export const updateProduct = async (req, res) => {
  try {

    const { name, brand, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existingProduct = await Product.findOne({
      slug,
      _id: { $ne: req.params.id }
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product name already exists"
      });
    }

    product.name = name;
    product.slug = slug;
    product.brand = brand || null;
    product.category = category;

    /* ✅ If new images uploaded */

    if (req.files && req.files.length > 0) {

      /* delete old images */
      for (const img of product.images) {
        if (img.publicId) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }

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



/* -------------------------
   DELETE PRODUCT
------------------------- */

export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /* delete images from cloudinary */

    for (const img of product.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    product.isActive = false;

    await product.save();

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};



/* -------------------------
   FORM DATA (DROPDOWN)
------------------------- */

export const getProductFormData = async (req, res) => {
  try {

    const brands = await Brand.find({ isActive: true }).sort({ name: 1 });

    const categories = await Category.find({ isActive: true }).sort({ name: 1 });

    res.json({
      brands,
      categories
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch form data"
    });
  }
};