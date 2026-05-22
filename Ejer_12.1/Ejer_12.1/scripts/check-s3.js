const fs = require("node:fs");
const { HeadBucketCommand, ListBucketsCommand, S3Client } = require("@aws-sdk/client-s3");

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
  const s3 = new S3Client({
    region: env.S3_REGION || "us-east-1",
    endpoint: env.S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
  });

  const response = await s3.send(new ListBucketsCommand({}));
  const buckets = response.Buckets || [];
  const bucketName = env.S3_BUCKET_NAME;

  console.log(`Bucket configurado: ${bucketName || "NO DEFINIDO"}`);

  if (buckets.length === 0) {
    console.log("No hay buckets visibles con estas credenciales.");
  } else {
    console.log("Buckets visibles:");
    for (const bucket of buckets) {
      console.log(`- ${bucket.Name}`);
    }
  }

  if (!bucketName) {
    return;
  }

  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`OK: el bucket "${bucketName}" existe y es accesible.`);
  } catch (error) {
    console.log(`ERROR: el bucket "${bucketName}" no es accesible.`);
    console.log(`${error.name}: ${error.message}`);
  }
}

main().catch((error) => {
  console.error(`${error.name}: ${error.message}`);
  process.exit(1);
});
