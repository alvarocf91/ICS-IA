import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const required = [
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_ENDPOINT",
  "S3_BUCKET_NAME"
];

for (const name of required) {
  if (!process.env[name]) {
    throw new Error(`Falta ${name} en .env.local`);
  }
}

export const bucketName = process.env.S3_BUCKET_NAME;

export const s3 = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

export async function uploadImageToS3({ key, body, contentType }) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  );
}

export async function getImageFromS3(key) {
  return s3.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    })
  );
}
