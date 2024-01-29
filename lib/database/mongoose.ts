// import mongoose from "mongoose";

// let isConnected = false; // Variable to track the connection status

// export const connectToDB = async () => {
//   // Set strict query mode for Mongoose to prevent unknown field queries.
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

//   // If the connection is already established, return without creating a new connection.
//   if (isConnected) {
//     console.log("MongoDB connection already established");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL);

//     isConnected = true; // Set the connection status to true
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// import mongoose, { Connection } from 'mongoose';

// let isConnected = false; // Variable to track the connection status

// export const connectToDB = async (): Promise<Connection | null> => {
//   // Set strict query mode for Mongoose to prevent unknown field queries.
//   mongoose.set('strictQuery', true);

//   if (!process.env.MONGODB_URL) {
//     console.log('Missing MongoDB URL');
//     return null;
//   }

//   // If the connection is already established, return the existing connection.
//   if (isConnected) {
//     console.log('MongoDB connection already established');
//     return mongoose.connection;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL);

//     isConnected = true; // Set the connection status to true
//     console.log('MongoDB connected');

//     return mongoose.connection;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;
