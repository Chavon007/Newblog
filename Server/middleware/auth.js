// middleware/auth.js
import jwt from "jsonwebtoken";

export default async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token; // token from cookie
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next(); // continue to the route
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
