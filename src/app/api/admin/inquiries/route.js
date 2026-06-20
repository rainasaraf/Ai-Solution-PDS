import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";

    // Filtering query
    let query = {};
    if (search) {
      query = {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { companyName: { $regex: search, $options: "i" } }
        ]
      };
    }

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    // Calculate statistics
    const totalInquiries = await Inquiry.countDocuments();
    
    // This month stats
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0,0,0,0);
    const thisMonthInquiries = await Inquiry.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Unique countries
    const uniqueCountriesList = await Inquiry.distinct("country");
    const uniqueCountriesCount = uniqueCountriesList.length;

    // Pending Review: count documents with status "Pending"
    const pendingReviewCount = await Inquiry.countDocuments({
      status: "Pending"
    });

    return Response.json({
      inquiries,
      stats: {
        total: totalInquiries,
        thisMonth: thisMonthInquiries,
        countries: uniqueCountriesCount,
        pending: pendingReviewCount
      }
    });
  } catch (error) {
    console.error("Admin Inquiries GET Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
