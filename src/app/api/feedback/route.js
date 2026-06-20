import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const approved = url.searchParams.get("approved") === "true";

    const query = approved ? { approved: true } : {};
    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });
    
    return Response.json(feedbacks);
  } catch (error) {
    console.error("Feedback Retrieval Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, companyName, rating, message } = body;

    if (!name || !companyName || !rating || !message) {
      return Response.json({ error: "Missing required feedback fields" }, { status: 400 });
    }

    const review = await Feedback.create({
      name,
      companyName,
      rating: Number(rating),
      message,
      approved: true, // Auto-approved: shows immediately in Verified Testimonials
      createdAt: new Date()
    });

    return Response.json({ message: "Feedback submitted for review", id: review._id });
  } catch (error) {
    console.error("Feedback Submission Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
