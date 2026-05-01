const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  addOrderItems,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// POST /api/orders — create order (authenticated users)
router.post("/", protect, addOrderItems);

// GET /api/orders/myorders — logged-in user's own orders
router.get("/myorders", protect, getMyOrders);

// GET /api/orders/all — admin: all orders
router.get("/all", protect, authorizeRoles("admin"), getAllOrders);

// GET /api/orders/:id — single order (owner or admin)
router.get("/:id", protect, getOrderById);

// PUT /api/orders/:id/status — admin: update order status
router.put("/:id/status", protect, authorizeRoles("admin"), updateOrderStatus);

module.exports = router;
