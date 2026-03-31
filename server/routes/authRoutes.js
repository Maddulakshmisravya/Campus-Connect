const express = require("express");
const {
  signupUser,
  loginUser,
  completeProfile,
  getAllUsers,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.put("/complete-profile", authMiddleware, completeProfile);
router.get("/users", authMiddleware, getAllUsers);

module.exports = router;