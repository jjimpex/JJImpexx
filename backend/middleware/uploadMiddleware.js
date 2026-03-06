// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../src/config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "jjimpex/brands",
//     allowed_formats: ["jpg", "png", "jpeg", "webp"]
//   }
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../src/config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "JJImpex/brands",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const uploadBrands = multer({ storage });

export default uploadBrands;