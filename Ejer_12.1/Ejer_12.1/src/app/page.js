import ImageManager from "@/components/ImageManager";
import { getImagesCollection } from "@/lib/mongodb";

async function getInitialImages() {
  const collection = await getImagesCollection();
  const images = await collection.find({}).sort({ createdAt: -1 }).limit(60).toArray();

  return images.map((image) => ({
    id: image._id.toString(),
    filename: image.filename,
    originalName: image.originalName,
    objects: image.objects || [],
    imageUrl: `/api/files/${image.filename}`,
    createdAt: image.createdAt?.toISOString?.() || null
  }));
}

export default async function Home() {
  const images = await getInitialImages();

  return <ImageManager initialImages={images} />;
}
