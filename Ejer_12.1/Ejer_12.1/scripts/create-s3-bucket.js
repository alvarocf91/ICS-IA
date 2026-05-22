const fs = require("node:fs");
const { CreateBucketCommand, HeadBucketCommand, S3Client } = require("@aws-sdk/client-s3");

function loadEnv(path) {
  const env = {};
  const content = fs.readFileSync(path, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);

    if (!match) {
      continue;
    }

    env[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
  }

  return env;
}

async function main() {
  const env = loadEnv(".env.local");
  const bucket = env.S3_BUCKET_NAME;

  if (!bucket) {
    throw new Error("Falta S3_BUCKET_NAME en .env.local");
  }

  const s3 = new S3Client({
    region: env.S3_REGION || "us-east-1",
    endpoint: env.S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
  });

  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`El bucket "${bucket}" ya existe y es accesible.`);
    return;
  } catch {
    console.log(`Creando bucket "${bucket}"...`);
  }

  await s3.send(new CreateBucketCommand({ Bucket: bucket }));
  await s3.send(new HeadBucketCommand({ Bucket: bucket }));
  console.log(`OK: el bucket "${bucket}" se ha creado y es accesible.`);
}

main().catch((error) => {
  console.error(`${error.name}: ${error.message}`);
  process.exit(1);
});
