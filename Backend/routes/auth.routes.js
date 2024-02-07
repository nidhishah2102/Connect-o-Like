const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// router.post("/upload-logo", upload.single("logo"), userController.uploadLogo);

module.exports = router;
