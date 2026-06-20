import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String, // e.g., "June 25, 2026"
  time: String, // e.g., "14:00 GMT"
  location: String, // e.g., "Virtual Webinar" or address
  registrationCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Event ||
mongoose.model("Event", EventSchema);
