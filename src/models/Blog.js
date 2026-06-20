import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  author: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Blog ||
mongoose.model("Blog", BlogSchema);
