import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../src/config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "JJImpex/categories",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const uploadCategories = multer({ storage });

export default uploadCategories;