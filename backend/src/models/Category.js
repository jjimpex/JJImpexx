import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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

    icon: {
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

const Category = mongoose.model("Category", categorySchema);
export default Category;