import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "libreria";

if (!uri) {
  throw new Error("Falta MONGODB_URI en .env.local");
}

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getImagesCollection() {
  const client = await clientPromise;
  return client.db(dbName).collection("imagenes");
}
