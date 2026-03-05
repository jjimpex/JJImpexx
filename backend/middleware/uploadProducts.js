import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../src/config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "JJImpex/products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const uploadProducts = multer({ storage });

export default uploadProducts;