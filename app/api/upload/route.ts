import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Define upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the directory exists before saving the file
    try {
      await mkdir(uploadDir, { recursive: true }); // ✅ Create the folder if it doesn't exist
    } catch (dirError) {
      console.error("Error creating upload directory:", dirError);
      return NextResponse.json(
        { error: "Failed to create upload directory" },
        { status: 500 }
      );
    }

    // Define file path
    const filePath = path.join(uploadDir, file.name);

    // Save the file
    await writeFile(filePath, buffer);

    // Construct the file URL (accessible in Next.js)
    const fileUrl = `/uploads/${file.name}`;

    return NextResponse.json({
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
