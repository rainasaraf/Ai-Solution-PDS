import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    
    if (!deletedInquiry) {
      return Response.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return Response.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Inquiry Delete Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    if (!id || !status) {
      return Response.json({ error: "Missing inquiry ID or status" }, { status: 400 });
    }

    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return Response.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return Response.json({ message: "Inquiry status updated successfully", inquiry: updated });
  } catch (error) {
    console.error("Inquiry PUT Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
