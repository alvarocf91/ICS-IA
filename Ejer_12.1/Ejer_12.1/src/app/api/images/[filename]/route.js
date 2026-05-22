import { NextResponse } from "next/server";
import { getImageFromS3 } from "@/lib/s3";

export async function GET(_request, { params }) {
  try {
    const { filename } = await params;
    const object = await getImageFromS3(filename);
    const bytes = await object.Body.transformToByteArray();

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": object.ContentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "No se pudo cargar la imagen desde Filebase/S3." }, { status: 404 });
  }
}
