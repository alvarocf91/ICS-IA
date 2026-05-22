import { NextResponse } from "next/server";
import { getImageFromS3 } from "@/lib/s3";

export const runtime = "nodejs";

async function streamToArrayBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function GET(_request, { params }) {
  try {
    const { key } = await params;
    const file = await getImageFromS3(key);
    const body = await streamToArrayBuffer(file.Body);

    return new NextResponse(body, {
      headers: {
        "Content-Type": file.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Imagen no encontrada." }, { status: 404 });
  }
}
