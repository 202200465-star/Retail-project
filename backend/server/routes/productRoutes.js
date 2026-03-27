const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorizeRoles("admin"), createProduct);
router.put("/:id", protect, authorizeRoles("admin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// const {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.post("/", protect, authorizeRoles("admin"), createProduct);
// router.put("/:id", protect, authorizeRoles("admin"), updateProduct);
// router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

// module.exports = router;