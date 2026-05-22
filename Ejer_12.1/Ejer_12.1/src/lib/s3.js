import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_ENDPOINT;
const bucket = process.env.S3_BUCKET_NAME;

if (!endpoint || !bucket) {
  throw new Error("Faltan S3_ENDPOINT o S3_BUCKET_NAME en .env.local");
}

export const s3 = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadImageToS3({ key, body, contentType }) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

export async function getImageFromS3(key) {
  return s3.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}
