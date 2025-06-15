import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST method: Create a new project
export async function POST(req: NextRequest) {
  try {
    const { title, description, department, imageUrl, userId } =
      await req.json();

    if (!title || !description || !department || !userId) {
      return NextResponse.json(
        { error: "All fields are required except image." },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return NextResponse.json({ error: "Invalid userId." }, { status: 400 });
    }

    // Save project with image URL
    const project = await prisma.project.create({
      data: {
        title,
        description,
        department,
        imageUrl: imageUrl || null,
        userId: parsedUserId,
      },
    });

    return NextResponse.json(
      { message: "Project created successfully!", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the project." },
      { status: 500 }
    );
  }
}

// GET method: Fetch all projects
export async function GET() {
  try {
    // Fetch projects from the database, ordered by creation date
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc", // Sort by createdAt in descending order (latest projects first)
      },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the projects." },
      { status: 500 }
    );
  }
}
