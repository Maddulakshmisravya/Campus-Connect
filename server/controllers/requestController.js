const Request = require("../models/Request");

const sendRequest = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    if (req.userId === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }

    const existingRequest = await Request.findOne({
      sender: req.userId,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const newRequest = new Request({
      sender: req.userId,
      receiver: receiverId,
      message: message || "",
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.userId })
      .populate("sender", "name email college branch year skillsOffered")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.userId })
      .populate("receiver", "name email college branch year skillsOffered")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.receiver.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized to update this request",
      });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getConnections = async (req, res) => {
  try {
    const acceptedRequests = await Request.find({
      status: "accepted",
      $or: [{ sender: req.userId }, { receiver: req.userId }],
    })
      .populate(
        "sender",
        "name college branch year bio skillsOffered skillsWanted"
      )
      .populate(
        "receiver",
        "name college branch year bio skillsOffered skillsWanted"
      )
      .sort({ updatedAt: -1 });

    const connections = acceptedRequests.map((reqDoc) => {
      if (reqDoc.sender._id.toString() === req.userId) {
        return reqDoc.receiver;
      }
      return reqDoc.sender;
    });

    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  sendRequest,
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
  getConnections,
};