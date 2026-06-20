import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json(blogs);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { title, summary, content, author, tags } = await req.json();

    if (!title || !summary || !content || !author) {
      return Response.json({ error: "Missing required blog fields" }, { status: 400 });
    }

    const newBlog = await Blog.create({
      title,
      summary,
      content,
      author,
      tags: tags || [],
      createdAt: new Date()
    });

    return Response.json({ message: "Blog published successfully", blog: newBlog });
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
      return Response.json({ error: "Missing blog ID" }, { status: 400 });
    }

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { id, title, summary, content, author, tags } = await req.json();

    if (!id || !title || !summary || !content || !author) {
      return Response.json({ error: "Missing required fields for update" }, { status: 400 });
    }

    const updated = await Blog.findByIdAndUpdate(
      id,
      { title, summary, content, author, tags: tags || [] },
      { new: true }
    );

    if (!updated) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ message: "Blog updated successfully", blog: updated });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
