import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "You don't have an account. Please create one." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // create token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.fullName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" } // fallback 1 day
    );

    // set cookie (development friendly)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // works on localhost
      secure: false, // disable https-only for dev
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.fullName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
