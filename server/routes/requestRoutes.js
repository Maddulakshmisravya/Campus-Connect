const express = require("express");
const {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
  getConnections,
} = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", authMiddleware, sendRequest);
router.get("/received", authMiddleware, getReceivedRequests);
router.get("/sent", authMiddleware, getSentRequests);
router.put("/update/:requestId", authMiddleware, updateRequestStatus);
router.get("/connections", authMiddleware, getConnections);

module.exports = router;