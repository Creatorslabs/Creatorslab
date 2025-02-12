import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGO_URI as string;
if (!mongoURI)
  throw new Error("MONGO_URI is not defined in environment variables");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to prevent multiple connections
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(mongoURI);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, create a new client for each request
  client = new MongoClient(mongoURI);
  clientPromise = client.connect();
}

export default clientPromise;
