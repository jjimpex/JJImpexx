// backend/middleware/adminAuthMiddleware.js
export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "admin-authenticated") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};