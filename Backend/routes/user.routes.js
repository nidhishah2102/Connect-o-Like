const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/user.controller");
const jwt = require("jsonwebtoken");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to verify access token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

router.get("/search", verifyToken, userController.searchUsers);
router.get(
  "/getconnection",
  verifyToken,
  userController.fetchConnectionRequests
);
router.get("/connectedusers", verifyToken, userController.getUserConnections);
router.get("/public/:userId", verifyToken, userController.getPublicUserProfile);
router.post(
  "/accept-request/:requestId",
  verifyToken,
  userController.acceptConnectionRequests
);
router.post(
  "/reject-request/:requestId",
  verifyToken,
  userController.rejectConnectionRequest
);

router.get("/:userId", verifyToken, userController.userProfile);
router.post("/:userId", verifyToken, userController.updateUserProfile);
router.post(
  "/profile/:userId",
  verifyToken,
  upload.single("profile"),
  userController.uploadProfile
);
router.post(
  "/send-connection-request/:receiverId",
  verifyToken,
  userController.sendConnectionRequest
);

module.exports = router;
