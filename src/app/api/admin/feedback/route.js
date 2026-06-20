import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

export async function GET() {
  try {
    await connectDB();
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    return Response.json(feedback);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id, approved } = await req.json();

    if (!id) {
      return Response.json({ error: "Missing feedback ID" }, { status: 400 });
    }

    const updated = await Feedback.findByIdAndUpdate(id, { approved }, { new: true });
    
    if (!updated) {
      return Response.json({ error: "Feedback not found" }, { status: 404 });
    }

    return Response.json({ message: "Feedback status updated", feedback: updated });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Missing feedback ID" }, { status: 400 });
    }

    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Feedback not found" }, { status: 404 });
    }

    return Response.json({ message: "Feedback deleted" });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
