import { MongoClient } from "mongodb";

// Declare augmented global type for development caching
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Development: use global variable to preserve connection across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoURI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production: reuse existing connection (critical for serverless environments)
  client = new MongoClient(mongoURI);
  clientPromise = client.connect();
}

export default clientPromise;
