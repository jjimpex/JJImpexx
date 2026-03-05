import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminCredential from "../models/AdminCredential.js";

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await AdminCredential.findOne({
    username: "adminjjimpex"
  });

  if (!exists) {
    await AdminCredential.create({
      username: "adminjjimpex",
      password: "jjimpexadmin@22"
    });

    console.log("✅ Admin credentials seeded");
  } else {
    console.log("⚠️ Admin already exists");
  }

  process.exit();
};

seedAdmin();