import express from "express";
import jwt from "jsonwebtoken";
const route = express.Router();

route.get("/me", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Failed to fetch" });
  }
});

export default route;
