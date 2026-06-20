import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  companyName: String,
  country: String,
  jobTitle: String,
  jobDetails: String,
  status: { type: String, default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Inquiry ||
mongoose.model("Inquiry", InquirySchema);
