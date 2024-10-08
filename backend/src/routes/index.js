const express = require("express");
const router = express.Router();
const {
  registerController,
  loginUserController,
} = require("../controllers/authController");

//AUTH ROUTES(PUBLIC ROUTES).
router.post("/register", registerController);
router.post("/login", loginUserController);

// PROTECTED ROUTES

module.exports = router;
