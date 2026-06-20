import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    return Response.json(items);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { title, imageUrl, category, rating } = await req.json();

    if (!title || !imageUrl || !category) {
      return Response.json({ error: "Missing required gallery fields" }, { status: 400 });
    }

    const newItem = await GalleryItem.create({
      title,
      imageUrl,
      category,
      rating: Number(rating) || 5,
      createdAt: new Date()
    });

    return Response.json({ message: "Gallery item created", item: newItem });
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
      return Response.json({ error: "Missing item ID" }, { status: 400 });
    }

    const deleted = await GalleryItem.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return Response.json({ message: "Gallery item deleted" });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id, title, imageUrl, category, rating } = await req.json();

    if (!id || !title || !imageUrl || !category) {
      return Response.json({ error: "Missing required fields for update" }, { status: 400 });
    }

    const updated = await GalleryItem.findByIdAndUpdate(
      id,
      { title, imageUrl, category, rating: Number(rating) || 5 },
      { new: true }
    );

    if (!updated) {
      return Response.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return Response.json({ message: "Gallery item updated successfully", item: updated });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
