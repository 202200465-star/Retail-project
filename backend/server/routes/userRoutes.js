const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { getProfile, updateProfile, getAllUsers, updateUserAdmin } = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("profilePhoto"), updateProfile);

router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.put("/:id", protect, authorizeRoles("admin"), updateUserAdmin);

module.exports = router;
