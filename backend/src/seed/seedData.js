import mongoose from "mongoose";
import dotenv from "dotenv";

import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

/* =======================
   BRANDS
======================= */
const seedBrands = async () => {
  const brands = [
    { name: "Lee Kum Kee", slug: "lee-kum-kee", logo: "/assets/brands/lee-kum-kee.png" },
    { name: "Golden Crown", slug: "golden-crown", logo: "/assets/brands/golden-crown.png" },
    { name: "Amul", slug: "amul", logo: "/assets/brands/amul.png" },
    { name: "Kikkoman", slug: "kikkoman", logo: "/assets/brands/kikkoman.png" },
    { name: "Monin", slug: "monin", logo: "/assets/brands/monin.png" }
  ];

  for (const brand of brands) {
    const exists = await Brand.findOne({ slug: brand.slug });
    if (!exists) {
      await Brand.create(brand);
      console.log(`✅ Brand added: ${brand.name}`);
    }
  }
};

/* =======================
   CATEGORIES
======================= */
const seedCategories = async () => {
  const categories = [
    { name: "Sauces & Seasonings", slug: "sauces-seasonings", icon: "/assets/categories/sauces.png" },
    { name: "Dairy", slug: "dairy", icon: "/assets/categories/dairy.png" },
    { name: "Frozen Foods", slug: "frozen-foods", icon: "/assets/categories/frozen.png" },
    { name: "Dry Fruits & Nuts", slug: "dry-fruits-nuts", icon: "/assets/categories/dry-fruits.png" },
    { name: "Edible Oils", slug: "edible-oils", icon: "/assets/categories/oils.png" },
    { name: "Beverages", slug: "beverages", icon: "/assets/categories/beverages.png" }
  ];

  for (const category of categories) {
    const exists = await Category.findOne({ slug: category.slug });
    if (!exists) {
      await Category.create(category);
      console.log(`✅ Category added: ${category.name}`);
    }
  }
};

/* =======================
   PRODUCTS (EXTENDED)
======================= */
const seedProducts = async () => {
  const brands = {
    lee: await Brand.findOne({ slug: "lee-kum-kee" }),
    amul: await Brand.findOne({ slug: "amul" }),
    kikkoman: await Brand.findOne({ slug: "kikkoman" }),
    golden: await Brand.findOne({ slug: "golden-crown" }),
    monin: await Brand.findOne({ slug: "monin" })
  };

  const categories = {
    sauces: await Category.findOne({ slug: "sauces-seasonings" }),
    dairy: await Category.findOne({ slug: "dairy" }),
    frozen: await Category.findOne({ slug: "frozen-foods" }),
    oils: await Category.findOne({ slug: "edible-oils" }),
    beverages: await Category.findOne({ slug: "beverages" })
  };

  const products = [
    /* ================= LEE KUM KEE (4) ================= */
    {
      name: "Lee Kum Kee Dark Soy Sauce",
      slug: "lkk-dark-soy-sauce",
      brand: brands.lee._id,
      category: categories.sauces._id,
      price: 340,
      description: "Dark soy sauce for rich color and flavor",
      images: ["/assets/products/lkk-dark-soy.png"]
    },
    {
      name: "Lee Kum Kee Hoisin Sauce",
      slug: "lkk-hoisin-sauce",
      brand: brands.lee._id,
      category: categories.sauces._id,
      price: 360,
      description: "Sweet and savory hoisin sauce",
      images: ["/assets/products/hoisin.png"]
    },
    {
      name: "Lee Kum Kee Chili Oil",
      slug: "lkk-chili-oil",
      brand: brands.lee._id,
      category: categories.sauces._id,
      price: 310,
      description: "Aromatic chili oil with spices",
      images: ["/assets/products/chili-oil.png"]
    },
    {
      name: "Lee Kum Kee Sesame Oil",
      slug: "lkk-sesame-oil",
      brand: brands.lee._id,
      category: categories.oils._id,
      price: 520,
      description: "Pure toasted sesame oil",
      images: ["/assets/products/sesame-oil.png"]
    },

    /* ================= AMUL (4) ================= */
    {
      name: "Amul Fresh Cream",
      slug: "amul-fresh-cream",
      brand: brands.amul._id,
      category: categories.dairy._id,
      price: 230,
      description: "Rich and smooth fresh cream",
      images: ["/assets/products/fresh-cream.png"]
    },
    {
      name: "Amul Mozzarella Cheese",
      slug: "amul-mozzarella-cheese",
      brand: brands.amul._id,
      category: categories.dairy._id,
      price: 480,
      description: "Perfect cheese for pizzas",
      images: ["/assets/products/mozzarella.png"]
    },
    {
      name: "Amul Whipping Cream",
      slug: "amul-whipping-cream",
      brand: brands.amul._id,
      category: categories.dairy._id,
      price: 390,
      description: "Ideal for desserts & baking",
      images: ["/assets/products/whipping-cream.png"]
    },
    {
      name: "Amul Pure Ghee",
      slug: "amul-pure-ghee",
      brand: brands.amul._id,
      category: categories.dairy._id,
      price: 720,
      description: "Traditional pure cow ghee",
      images: ["/assets/products/ghee.png"]
    },

    /* ================= KIKKOMAN (4) ================= */
    {
      name: "Kikkoman Less Salt Soy Sauce",
      slug: "kikkoman-less-salt-soy",
      brand: brands.kikkoman._id,
      category: categories.sauces._id,
      price: 470,
      description: "40% less salt soy sauce",
      images: ["/assets/products/less-salt-soy.png"]
    },
    {
      name: "Kikkoman Sushi Soy Sauce",
      slug: "kikkoman-sushi-soy",
      brand: brands.kikkoman._id,
      category: categories.sauces._id,
      price: 430,
      description: "Specially crafted for sushi",
      images: ["/assets/products/sushi-soy.png"]
    },
    {
      name: "Kikkoman Teriyaki Glaze",
      slug: "kikkoman-teriyaki-glaze",
      brand: brands.kikkoman._id,
      category: categories.sauces._id,
      price: 410,
      description: "Thick teriyaki cooking glaze",
      images: ["/assets/products/teriyaki-glaze.png"]
    },
    {
      name: "Kikkoman Rice Vinegar",
      slug: "kikkoman-rice-vinegar",
      brand: brands.kikkoman._id,
      category: categories.sauces._id,
      price: 390,
      description: "Japanese rice vinegar",
      images: ["/assets/products/rice-vinegar.png"]
    },

    /* ================= GOLDEN CROWN (4) ================= */
    {
      name: "Golden Crown Frozen French Fries",
      slug: "golden-crown-french-fries",
      brand: brands.golden._id,
      category: categories.frozen._id,
      price: 310,
      description: "Crispy frozen french fries",
      images: ["/assets/products/fries.png"]
    },
    {
      name: "Golden Crown Frozen Broccoli",
      slug: "golden-crown-broccoli",
      brand: brands.golden._id,
      category: categories.frozen._id,
      price: 290,
      description: "Frozen broccoli florets",
      images: ["/assets/products/broccoli.png"]
    },
    {
      name: "Golden Crown Mixed Vegetables",
      slug: "golden-crown-mixed-veg",
      brand: brands.golden._id,
      category: categories.frozen._id,
      price: 270,
      description: "Frozen mixed vegetables",
      images: ["/assets/products/mixed-veg.png"]
    },
    {
      name: "Golden Crown Sweet Corn Kernels",
      slug: "golden-crown-sweet-corn",
      brand: brands.golden._id,
      category: categories.frozen._id,
      price: 250,
      description: "Frozen sweet corn kernels",
      images: ["/assets/products/sweet-corn.png"]
    },

    /* ================= MONIN (4) ================= */
    {
      name: "Monin Caramel Syrup",
      slug: "monin-caramel-syrup",
      brand: brands.monin._id,
      category: categories.beverages._id,
      price: 760,
      description: "Rich caramel flavored syrup",
      images: ["/assets/products/caramel.png"]
    },
    {
      name: "Monin Chocolate Syrup",
      slug: "monin-chocolate-syrup",
      brand: brands.monin._id,
      category: categories.beverages._id,
      price: 780,
      description: "Premium chocolate syrup",
      images: ["/assets/products/chocolate.png"]
    },
    {
      name: "Monin Strawberry Syrup",
      slug: "monin-strawberry-syrup",
      brand: brands.monin._id,
      category: categories.beverages._id,
      price: 740,
      description: "Sweet strawberry syrup",
      images: ["/assets/products/strawberry.png"]
    },
    {
      name: "Monin Blue Curacao",
      slug: "monin-blue-curacao",
      brand: brands.monin._id,
      category: categories.beverages._id,
      price: 820,
      description: "Citrus flavored blue syrup",
      images: ["/assets/products/blue-curacao.png"]
    }
  ];

  for (const product of products) {
    const exists = await Product.findOne({ slug: product.slug });
    if (!exists) {
      await Product.create(product);
      console.log(`✅ Product added: ${product.name}`);
    }
  }
};

/* =======================
   RUN SEEDER
======================= */
const seedData = async () => {
  try {
    await connectDB();
    console.log("🌱 Seeding JJImpex database...");

    await seedBrands();
    await seedCategories();
    await seedProducts();

    console.log("✅ Seeding finished safely (no duplicates)");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();