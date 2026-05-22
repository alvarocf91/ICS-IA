import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { detectObjectsWithGroq } from "@/lib/groq";
import { getImagesCollection } from "@/lib/mongodb";
import { uploadImageToS3 } from "@/lib/s3";

export async function GET(request) {
  try {
    const collection = await getImagesCollection();
    const { searchParams } = new URL(request.url);
    const terms = parseTerms(searchParams.get("q"));

    const query =
      terms.length > 0
        ? {
            objects: { $all: terms },
          }
        : {};

    const images = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(60)
      .toArray();

    return NextResponse.json({
      images: images.map((image) => ({
        id: image._id.toString(),
        filename: image.filename,
        originalName: image.originalName,
        objects: image.objects || [],
        createdAt: image.createdAt,
        url: `/api/images/${image.filename}`,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: friendlyError(error) }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Sube una imagen valida." }, { status: 400 });
    }

    if (!file.type?.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = extname(file.name) || mimeExtension(file.type);
    const filename = `${randomUUID()}${extension}`;

    console.log(`[images] Subiendo ${filename} a Filebase/S3...`);
    await uploadImageToS3({
      key: filename,
      body: buffer,
      contentType: file.type,
    });

    console.log(`[images] Analizando ${filename} con Groq...`);
    const objects = await detectObjectsWithGroq({ buffer, contentType: file.type });

    const document = {
      filename,
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      objects,
      createdAt: new Date(),
    };

    console.log(`[images] Guardando ${filename} en MongoDB...`);
    const collection = await getImagesCollection();
    const result = await collection.insertOne(document);
    console.log(`[images] Imagen ${filename} guardada correctamente.`);

    return NextResponse.json(
      {
        image: {
          id: result.insertedId.toString(),
          filename,
          originalName: file.name,
          objects,
          createdAt: document.createdAt,
          url: `/api/images/${filename}`,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[images] Error en POST /api/images:", error);
    return NextResponse.json({ error: friendlyError(error) }, { status: 500 });
  }
}

function parseTerms(value) {
  if (!value) {
    return [];
  }

  return value
    .split(/[,\s]+/)
    .map((term) => term.toLowerCase().trim())
    .map((term) => term.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    .filter(Boolean)
    .slice(0, 8);
}

function mimeExtension(type) {
  const extensions = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };

  return extensions[type] || ".jpg";
}

function friendlyError(error) {
  const message = error?.message || "Error desconocido";

  if (error?.name === "NoSuchBucket" || message.includes("NoSuchBucket")) {
    return "El bucket de Filebase/S3 no existe o no es accesible. Revisa S3_BUCKET_NAME en .env.local.";
  }

  if (message.includes("Groq")) {
    return `Error al analizar la imagen con Groq. ${message}`;
  }

  if (message.includes("Mongo")) {
    return `Error al guardar en MongoDB. ${message}`;
  }

  return message;
}
