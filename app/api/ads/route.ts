import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("image") as File | null; // Ensure the file field name is "image"
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    if (file) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Define upload directory
      const uploadDir = path.join(process.cwd(), "public/uploads2");

      // Ensure the directory exists before saving the file
      await mkdir(uploadDir, { recursive: true });

      // Define file path with a timestamp to avoid name conflicts
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      // Save the file
      await writeFile(filePath, buffer);

      // Construct the file URL (accessible in Next.js)
      imageUrl = `/uploads2/${fileName}`;
    }

    // Store ad details in the database
    const newAd = await prisma.ad.create({
      data: {
        title,
        description,
        imageUrl, // Save the file path in the database
      },
    });

    return NextResponse.json(
      { message: "Ad created successfully", ad: newAd },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding ad:", error);
    return NextResponse.json({ error: "Failed to create ad" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch all ads from the database
    const ads = await prisma.ad.findMany();

    // Respond with the fetched ads
    return NextResponse.json({ ads }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
