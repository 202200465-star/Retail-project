// const express = require("express");
// const router = express.Router();

// const {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// router.get("/", getAllProducts);
// router.get("/:id", getProductById);

// router.post("/", protect, authorizeRoles("admin"), createProduct);
// router.put("/:id", protect, authorizeRoles("admin"), updateProduct);
// router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

// module.exports = router;



const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server running ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





















// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const productRoutes = require("./routes/productRoutes");

// app.use(cors());
// app.use(express.json());

// // test route
// app.get("/", (req, res) => {
//   res.json({ message: "Server running ✅" });
// });

// // Product routes
// app.use("/api/products", productRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));