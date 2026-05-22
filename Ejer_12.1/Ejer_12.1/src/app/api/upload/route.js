import { NextResponse } from "next/server";
import { getImagesCollection } from "@/lib/mongodb";
import { detectObjectsWithGroq } from "@/lib/groq";
import { uploadImageToS3 } from "@/lib/s3";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extensionFromFile(file) {
  const byName = file.name?.split(".").pop()?.toLowerCase();
  if (byName && /^[a-z0-9]+$/.test(byName)) {
    return byName === "jpeg" ? "jpg" : byName;
  }

  return file.type.split("/")[1] || "jpg";
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No se ha enviado ninguna imagen." }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "Formato no soportado. Usa JPG, PNG, WEBP o GIF." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${crypto.randomUUID()}.${extensionFromFile(file)}`;
    const base64 = buffer.toString("base64");
    const objects = await detectObjectsWithGroq({ base64, mimeType: file.type });

    await uploadImageToS3({
      key: filename,
      body: buffer,
      contentType: file.type
    });

    const document = {
      filename,
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      objects,
      createdAt: new Date()
    };

    const collection = await getImagesCollection();
    const result = await collection.insertOne(document);

    return NextResponse.json({
      image: {
        id: result.insertedId.toString(),
        filename,
        originalName: file.name,
        objects,
        imageUrl: `/api/files/${filename}`,
        createdAt: document.createdAt.toISOString()
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "No se pudo procesar la imagen." },
      { status: 500 }
    );
  }
}
