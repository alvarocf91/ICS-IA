import { NextResponse } from "next/server";
import { getImagesCollection } from "@/lib/mongodb";
import { parseSearchTerms } from "@/lib/search";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const terms = parseSearchTerms(searchParams.get("q"));
  const collection = await getImagesCollection();

  const query = terms.length > 0 ? { objects: { $all: terms } } : {};
  const images = await collection.find(query).sort({ createdAt: -1 }).limit(80).toArray();

  return NextResponse.json({
    images: images.map((image) => ({
      id: image._id.toString(),
      filename: image.filename,
      originalName: image.originalName,
      objects: image.objects || [],
      imageUrl: `/api/files/${image.filename}`,
      createdAt: image.createdAt?.toISOString?.() || null
    }))
  });
}
