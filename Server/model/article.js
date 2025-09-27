import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    content: String,
    source: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    urlToImage: String,
    publishedAt: { type: Date, required: true },
    category: [String],
  },
  { timestamps: true }
);

ArticleSchema.index({ title: "text", content: "text", source: "text" });

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
