import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { fullName, email, phone, companyName, country, jobTitle, jobDetails } = body;

    // Validate parameters
    if (!fullName || !email || !phone || !companyName || !country || !jobTitle || !jobDetails) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newInquiry = await Inquiry.create({
      fullName,
      email,
      phone,
      companyName,
      country,
      jobTitle,
      jobDetails,
      createdAt: new Date()
    });

    return Response.json({
      message: "Inquiry Submitted Successfully",
      id: newInquiry._id
    });
  } catch (error) {
    console.error("Inquiry Submission Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
