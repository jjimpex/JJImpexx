// import AdminCredential from "../models/AdminCredential.js";

// export const adminLogin = async (req, res) => {
//   const { id, password } = req.body;

//   const admin = await AdminCredential.findOne({
//     username: id
//   });

//   if (!admin) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   if (admin.password !== password) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   res.json({
//     success: true,
//     username: admin.username
//   });
// };

import AdminCredential from "../models/AdminCredential.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {

  try {

    const { id, password } = req.body;

    const admin = await AdminCredential.findOne({
      username: id
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        adminId: admin._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      username: admin.username
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Login failed" });

  }

};