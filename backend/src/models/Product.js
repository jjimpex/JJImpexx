// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     slug: {
//       type: String,
//       required: true,
//       lowercase: true,
//       unique: true,
//     },

//     brand: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Brand",
//       default: null,
//     },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },

//     price: {
//       type: Number,
//       required: true,
//     },

//     description: {
//       type: String,
//     },

//     images: [
//       {
//         type: String, // image paths
//       },
//     ],

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    lowercase: true,
    unique: true
  },

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default: null
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  images: [
    {
      url: String,
      publicId: String
    }
  ],

  isActive: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);