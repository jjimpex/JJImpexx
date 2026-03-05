import Brand from "../models/Brand.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";

export const getBrands = async (req, res) => {
  const brands = await Brand.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(brands);
};

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Logo required" });
    }

    const brand = await Brand.create({
      name,
      slug: slugify(name),
      logo: req.file.path,
      logoPublicId: req.file.filename
    });

    res.json(brand);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Brand creation failed" });
  }
};

export const updateBrand = async (req, res) => {
  try {

    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const { name } = req.body;

    brand.name = name;
    brand.slug = slugify(name);

    if (req.file) {

      // delete old image
      if (brand.logoPublicId) {
        await cloudinary.uploader.destroy(brand.logoPublicId);
      }

      brand.logo = req.file.path;
      brand.logoPublicId = req.file.filename;
    }

    await brand.save();

    res.json(brand);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Brand update failed" });
  }
};

export const deleteBrand = async (req, res) => {
  try {

    const brand = await Brand.findById(req.params.id);

    if (brand.logoPublicId) {
      await cloudinary.uploader.destroy(brand.logoPublicId);
    }

    await Brand.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};