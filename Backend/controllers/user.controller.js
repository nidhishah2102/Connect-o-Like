const User = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const ConnectionRequest = require("../models/connection.model.js");
exports.userProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.uploadProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.profile = req.file.buffer.toString("base64");

    await user.save();

    return res.status(201).json({
      message: "Profile picture uploaded successfully",
      userId: user._id,
      profile: user.profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { skills, experience, domain } = req.query;

    const query = {};
    if (skills) query.skills = { $in: skills };
    if (experience) query.experience = experience;
    if (domain) query.domain = domain;
    query._id = { $ne: req.user.userId };

    let users = await User.find(query);

    users = users.map((user) => ({
      _id: user._id,
      name: user.name,
      headline: user.headline,
      social: user.social,
      profile: user.profile,
      skills: user.skills,
      isConnection: user.connections.some(
        (connection) => connection.user.toString() === req.user.userId
      ),
    }));

    console.log("Users with connections:", users);

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendConnectionRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.userId;
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);

    if (!senderUser || !receiverUser) {
      return res
        .status(404)
        .json({ error: "Sender or receiver user not found" });
    }

    if (!senderUser.connections) {
      senderUser.connections = [];
    }
    // Check if the connection request already exists
    const existingRequest = await ConnectionRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Connection request already sent" });
    }

    // Create a connection request
    const connectionRequest = new ConnectionRequest({
      sender: senderId,
      receiver: receiverId,
    });

    await connectionRequest.save();

    // Update the sender's connections
    senderUser.connections.push({ user: receiverId, status: "pending" });
    await senderUser.save();

    res.status(200).json({ message: "Connection request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getPublicUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUserId = req.user.userId;

    // Find the target user by ID
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure targetUser.connections is an array
    const connections = targetUser.connections || [];

    // Check if the requesting user is connected to the target user
    const isConnection = connections.some(
      (connection) =>
        connection.user.toString() === requestingUserId &&
        connection.status === "accepted"
    );

    // Return the user's profile details along with the connection status
    res.json({ profile: targetUser, isConnection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.fetchConnectionRequests = async (req, res) => {
  try {
    const userID = req.user.userId;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const connectionRequests = await ConnectionRequest.find({
      receiver: userID,
      status: "pending", // Only fetch requests with status "pending"
    });

    // Get sender details with only required fields
    const senderDetail = await User.find(
      {
        _id: {
          $in: connectionRequests.map(
            (connectionRequest) => connectionRequest.sender
          ),
        },
      },
      { _id: 1, name: 1, headline: 1, profile: 1 } // Include only required fields
    );

    // Combine sender details with request IDs
    const senderDetailWithRequests = senderDetail.map((sender, index) => {
      const request = connectionRequests[index];
      return {
        _id: request._id, // Add the request ID

        senderId: sender._id,
        name: sender.name,
        headline: sender.headline,
        profile: sender.profile,
      };
    });

    res.json({ senderDetail: senderDetailWithRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// router.post(
//   "/users/:userId/accept-connection-request/:requestId",
//   async (req, res) => {
exports.acceptConnectionRequests = async (req, res) => {
  try {
    const { requestId } = req.params;
    const connectionRequest = await ConnectionRequest.findById(requestId);

    if (!connectionRequest) {
      return res.status(404).json({ error: "Connection request not found" });
    }
    connectionRequest.status = "accepted";
    await connectionRequest.save();

    const senderUser = await User.findByIdAndUpdate(
      connectionRequest.sender,
      {
        $push: {
          connections: {
            user: connectionRequest.receiver,
            status: "accepted",
          },
        },
      },
      { new: true }
    );

    const receiverUser = await User.findByIdAndUpdate(
      connectionRequest.receiver,
      {
        $push: {
          connections: { user: connectionRequest.sender, status: "accepted" },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Connection request accepted successfully" });
  } catch (error) {
    console.error(error);
    Z;
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getUserConnections = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter connections with status "accepted"
    const approvedConnections = user.connections.filter(
      (connection) => connection.status === "accepted"
    );

    // Get details of connected users
    const connectedUsersPromises = approvedConnections.map(
      async (connection) => {
        const connectedUser = await User.findById(connection.user);
        return {
          _id: connectedUser._id,
          name: connectedUser.name,
          profile: connectedUser.profile,
          headline: connectedUser.headline,
        };
      }
    );

    // Wait for all promises to resolve
    const connectedUsers = await Promise.all(connectedUsersPromises);

    res.json({ connections: connectedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.rejectConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    await ConnectionRequest.deleteOne({ _id: requestId });

    res
      .status(200)
      .json({ message: "Connection request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
