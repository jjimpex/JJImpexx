import AdminCredential from "../models/AdminCredential.js";

export const adminLogin = async (req, res) => {
  const { id, password } = req.body;

  const admin = await AdminCredential.findOne({
    username: id
  });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    success: true,
    username: admin.username
  });
};