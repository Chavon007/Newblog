// routes/feed.js
import express from "express";
import Article from "../model/article.js";
import User from "../model/user.js";
import authMiddleware from "../middleware/auth.js"; 

const router = express.Router();

// GET /api/feed
router.get("/feed", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // your middleware should attach user info to req.user
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { keyword, source, page = 1, limit = 10 } = req.query;

    // Build query using the user's selected categories
    const query = {
      ...(user.selectedCategories.length > 0 && {
        category: { $in: user.selectedCategories },
      }),
      ...(source && { source }),
      ...(keyword && { $text: { $search: keyword } }),
    };

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalArticles = await Article.countDocuments(query);

    res.status(200).json({
      articles,
      total: totalArticles,
      page: Number(page),
      totalPages: Math.ceil(totalArticles / limit),
    });
  } catch (err) {
    console.error("Error fetching personalized feed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
