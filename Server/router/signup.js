import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { fullName, email, password, selectedCategories } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }

    // Validate categories
    if (!Array.isArray(selectedCategories) || selectedCategories.length < 2) {
      return res
        .status(400)
        .json({ message: "Please select at least 2 categories" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      selectedCategories,
    });

    // Send response without password
    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        selectedCategories: newUser.selectedCategories,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Failed to create account" });
  }
});

export default router;
