
// // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// import { MongoClient } from 'mongodb';

// declare global {
//   var _mongomongoClientPromise: Promise<MongoClient>;
// }

// if (!process.env.MONGODB_URL) {
//   throw new Error(
//     'Invalid/Missing environment variable: "MONGODB_URL"'
//   );
// }

// const uri = process.env.MONGODB_URL;
// const options = {};

// let client: MongoClient;
// let mongoClientPromise: Promise<MongoClient>;

// if (process.env.ENVIRONMENT === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongomongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongomongoClientPromise = client.connect();
//   }
//   mongoClientPromise = global._mongomongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   mongoClientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default mongoClientPromise;

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;