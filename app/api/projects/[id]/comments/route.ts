import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all comments for a specific project
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const projectId = parseInt(params.id, 10);

  try {
    const comments = await prisma.comment.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" }, // Latest comments first
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST: Add a new comment to a project
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const projectId = parseInt(params.id, 10);
  const { content } = await req.json();

  if (!content || content.trim() === "") {
    return NextResponse.json(
      { error: "Comment cannot be empty" },
      { status: 400 }
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        projectId,
        userId: 1, // Replace with the actual user ID
      },
    });

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
