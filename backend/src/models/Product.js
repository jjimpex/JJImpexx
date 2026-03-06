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
    lowercase: true
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


productSchema.index(
  { slug: 1 },
  {
    unique: true,
    partialFilterExpression: { isActive: true }
  }
);

export default mongoose.model("Product", productSchema);