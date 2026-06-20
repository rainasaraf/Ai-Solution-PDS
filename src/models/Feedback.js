import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: String,
  companyName: String,
  rating: Number, // 1 to 5
  message: String,
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Feedback ||
mongoose.model("Feedback", FeedbackSchema);
