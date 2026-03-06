import Brand from "../models/Brand.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";

export const getBrands = async (req, res) => {
  const brands = await Brand.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(brands);
};

// export const createBrand = async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Logo required" });
//     }

//     const brand = await Brand.create({
//       name,
//       slug: slugify(name),
//       logo: req.file.path,
//       logoPublicId: req.file.filename
//     });

//     res.json(brand);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Brand creation failed" });
//   }
// };

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Logo required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // check if brand already exists
    const existingBrand = await Brand.findOne({ slug });

    if (existingBrand) {
      // If brand exists but inactive → Reactivate
      if (!existingBrand.isActive) {
        // delete old logo from cloudinary
        if (existingBrand.logoPublicId) {
          await cloudinary.uploader.destroy(existingBrand.logoPublicId);
        }

        existingBrand.name = name;
        existingBrand.slug = slug;
        existingBrand.logo = req.file.path;
        existingBrand.logoPublicId = req.file.filename;
        existingBrand.isActive = true;

        await existingBrand.save();

        return res.json(existingBrand);
      }

      // Brand already active
      return res.status(400).json({
        message: "Brand already exists",
      });
    }

    // create new brand
    const brand = await Brand.create({
      name,
      slug,
      logo: req.file.path,
      logoPublicId: req.file.filename,
    });

    res.json(brand);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Brand creation failed" });
  }
};

// export const updateBrand = async (req, res) => {
//   try {
//     const brand = await Brand.findById(req.params.id);

//     if (!brand) {
//       return res.status(404).json({ message: "Brand not found" });
//     }

//     const { name } = req.body;

//     brand.name = name;
//     brand.slug = slugify(name);

//     if (req.file) {
//       // delete old image
//       if (brand.logoPublicId) {
//         await cloudinary.uploader.destroy(brand.logoPublicId);
//       }

//       brand.logo = req.file.path;
//       brand.logoPublicId = req.file.filename;
//     }

//     await brand.save();

//     res.json(brand);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Brand update failed" });
//   }
// };




// export const deleteBrand = async (req, res) => {
//   try {
//     // const brand = await Brand.findById(req.params.id);
//     const brand = await Brand.findById(req.params.id);

//     if (!brand) {
//       return res.status(404).json({ message: "Brand not found" });
//     }
//     if (brand.logoPublicId) {
//       await cloudinary.uploader.destroy(brand.logoPublicId);
//     }

//     await Brand.findByIdAndUpdate(req.params.id, { isActive: false });

//     res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Delete failed" });
//   }
// };


export const updateBrand = async (req, res) => {
  try {

    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const { name } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    // check if another brand already has this name
    const existingBrand = await Brand.findOne({
      slug,
      _id: { $ne: req.params.id }
    });

    if (existingBrand) {
      return res.status(400).json({ message: "Brand name already exists" });
    }

    brand.name = name;
    brand.slug = slug;

    if (req.file) {

      const oldPublicId = brand.logoPublicId;

      brand.logo = req.file.path;
      brand.logoPublicId = req.file.filename;

      // delete old logo AFTER new one is stored
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }

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

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // delete logo from cloudinary
    if (brand.logoPublicId) {
      await cloudinary.uploader.destroy(brand.logoPublicId);
    }

    // soft delete brand
    brand.isActive = false;
    await brand.save();

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Delete failed" });

  }
};
