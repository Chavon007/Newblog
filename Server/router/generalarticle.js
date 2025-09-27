import express from "express";
import Article from "../model/article.js";

const router = express.Router();

router.get("/article", async (req, res) => {
  try {
    const {
      keyword,
      source,
      startDate,
      endDate,
      limit = 10,
      page = 1,
    } = req.query;

    const filter = {};

    // Filter by source if provided
    if (source) filter.source = source;

    // Filter by publication date
    if (startDate || endDate) {
      filter.publishedAt = {};
      if (startDate) filter.publishedAt.$gte = new Date(startDate);
      if (endDate) filter.publishedAt.$lte = new Date(endDate);
    }

    // Base query
    let query = Article.find(filter);

    // Text search across title/content/source
    if (keyword) {
      query = query.find({ $text: { $search: keyword } });
    }

    // Pagination: skip and limit
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit)).sort({ publishedAt: -1 });

    const articles = await query.exec();
    const total = await Article.countDocuments(filter);

    res.json({
      articles,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
