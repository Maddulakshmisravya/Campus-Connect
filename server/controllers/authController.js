const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
  console.log("LOGIN ERROR:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
};
const getAllUsers = async (req, res) => {
  try {
    const { skill } = req.query;

    let filter = {
      _id: { $ne: req.userId },
      profileCompleted: true,
    };

    if (skill) {
    filter.$or = [
    { skillsOffered: { $regex: skill, $options: "i" } },
    { skillsWanted: { $regex: skill, $options: "i" } },
  ];
}

    const users = await User.find(filter, "-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const completeProfile = async (req, res) => {
  try {
    const { college, branch, year, bio, skillsOffered, skillsWanted } = req.body;
    if (
    !college ||
    !branch ||
    !year ||
    !bio ||
    !skillsOffered?.length ||
    !skillsWanted?.length
  ) {
  return res.status(400).json({
    message: "All fields are required to complete profile",
  });
}

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        college,
        branch,
        year,
        bio,
        skillsOffered,
        skillsWanted,
        profileCompleted: true,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile completed successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signupUser, loginUser, completeProfile, getAllUsers };