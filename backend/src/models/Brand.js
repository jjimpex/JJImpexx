import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },

    logo: {
      type: String, // image path
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;