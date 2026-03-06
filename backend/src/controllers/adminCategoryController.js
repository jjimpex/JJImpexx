import Category from "../models/Category.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({
    createdAt: -1,
  });
  res.json(categories);
};

// export const createCategory = async (req, res) => {
//   try {

//     const { name } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Icon required" });
//     }

//     const category = await Category.create({
//       name,
//       slug: slugify(name),
//       icon: req.file.path,
//       iconPublicId: req.file.filename
//     });

//     res.json(category);

//   } catch (err) {

//     console.error(err);
//     res.status(500).json({ message: "Category creation failed" });

//   }
// };

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Icon required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      // Reactivate if previously deleted
      if (!existingCategory.isActive) {
        // delete old icon from cloudinary
        if (existingCategory.iconPublicId) {
          await cloudinary.uploader.destroy(existingCategory.iconPublicId);
        }

        existingCategory.name = name;
        existingCategory.slug = slug;
        existingCategory.icon = req.file.path;
        existingCategory.iconPublicId = req.file.filename;
        existingCategory.isActive = true;

        await existingCategory.save();

        return res.json(existingCategory);
      }

      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      slug,
      icon: req.file.path,
      iconPublicId: req.file.filename,
    });

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Category creation failed" });
  }
};

// export const updateCategory = async (req, res) => {

//   try {

//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     const { name } = req.body;

//     category.name = name;
//     category.slug = slugify(name);

//     if (req.file) {

//       if (category.iconPublicId) {
//         await cloudinary.uploader.destroy(category.iconPublicId);
//       }

//       category.icon = req.file.path;
//       category.iconPublicId = req.file.filename;

//     }

//     await category.save();

//     res.json(category);

//   } catch (err) {

//     console.error(err);
//     res.status(500).json({ message: "Update failed" });

//   }

// };

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { name } = req.body;

    category.name = name;
    category.slug = slugify(name, { lower: true, strict: true });

    if (req.file) {
      // delete old icon
      if (category.iconPublicId) {
        await cloudinary.uploader.destroy(category.iconPublicId);
      }

      category.icon = req.file.path;
      category.iconPublicId = req.file.filename;
    }

    await category.save();

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// export const deleteCategory = async (req, res) => {

//   try {

//     const category = await Category.findById(req.params.id);

//     if (category.iconPublicId) {
//       await cloudinary.uploader.destroy(category.iconPublicId);
//     }

//     await Category.findByIdAndUpdate(req.params.id, { isActive: false });

//     res.json({ success: true });

//   } catch (err) {

//     console.error(err);
//     res.status(500).json({ message: "Delete failed" });

//   }

// };

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // delete icon from cloudinary
    if (category.iconPublicId) {
      await cloudinary.uploader.destroy(category.iconPublicId);
    }

    // soft delete
    category.isActive = false;
    await category.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};
