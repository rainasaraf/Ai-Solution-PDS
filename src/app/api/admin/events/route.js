import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return Response.json(events);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { title, description, date, time, location } = await req.json();

    if (!title || !description || !date || !time || !location) {
      return Response.json({ error: "Missing required event fields" }, { status: 400 });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      registrationCount: 0,
      createdAt: new Date()
    });

    return Response.json({ message: "Event created successfully", event: newEvent });
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
      return Response.json({ error: "Missing event ID" }, { status: 400 });
    }

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    return Response.json({ message: "Event deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id, title, description, date, time, location } = await req.json();

    if (!id || !title || !description || !date || !time || !location) {
      return Response.json({ error: "Missing required fields for update" }, { status: 400 });
    }

    const updated = await Event.findByIdAndUpdate(
      id,
      { title, description, date, time, location },
      { new: true }
    );

    if (!updated) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    return Response.json({ message: "Event updated successfully", event: updated });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
