import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import brandRoutes from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import adminBrandRoutes from "./routes/adminBrandRoutes.js";
import adminCategoryRoutes from "./routes/adminCategoryRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;


app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// for admin panel
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/brands", adminBrandRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/products", adminProductRoutes);

app.listen(PORT, () => {
  console.log(`✅ JJImpex server running on port ${PORT}`);
});



