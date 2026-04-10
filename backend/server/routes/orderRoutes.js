const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { addOrderItems, getMyOrders, getAllOrders } = require("../controllers/orderController");

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/all", protect, authorizeRoles("admin"), getAllOrders);

module.exports = router;
