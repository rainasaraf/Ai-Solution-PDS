import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String, // e.g., "Events", "Solutions", "Office"
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.GalleryItem ||
mongoose.model("GalleryItem", GalleryItemSchema);
