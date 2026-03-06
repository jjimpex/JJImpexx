// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import AdminCredential from "../models/AdminCredential.js";

// dotenv.config();

// const seedAdmin = async () => {
//   await mongoose.connect(process.env.MONGO_URI);

//   const exists = await AdminCredential.findOne({
//     username: "adminjjimpex"
//   });

//   if (!exists) {
//     await AdminCredential.create({
//       username: "adminjjimpex",
//       password: "jjimpexadmin@22"
//     });

//     console.log("✅ Admin credentials seeded");
//   } else {
//     console.log("⚠️ Admin already exists");
//   }

//   process.exit();
// };

// seedAdmin();

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import AdminCredential from "../models/AdminCredential.js";

dotenv.config();

const seedAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // const username = "adminjjimpex1";
    // const password = "jjimpexadmin@29";
    const username = "adminjjimpex2";
    const password = "jjimpexadmin@22";
    const exists = await AdminCredential.findOne({ username });

    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminCredential.create({
      username,
      password: hashedPassword
    });

    console.log("✅ Admin created successfully");
    console.log("Username:", admin.username);

    process.exit();

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedAdmin();