import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req) {
  try {
    await connectDB();
    const { eventId, fullName, email } = await req.json();

    if (!eventId || !fullName || !email) {
      return Response.json({ error: "Missing required registration parameters" }, { status: 400 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      // If it's a fallback ID (e.g. evt_1), return success to avoid erroring on mock screens
      if (eventId.startsWith("evt_")) {
        return Response.json({ message: "Mock registration successful" });
      }
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    // Increment registration count
    event.registrationCount = (event.registrationCount || 0) + 1;
    await event.save();

    return Response.json({ message: "Registration recorded successfully" });
  } catch (error) {
    console.error("Event Registration Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
