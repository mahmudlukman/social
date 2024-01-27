import NextAuth from 'next-auth';
import mongoClientPromise from './lib/database/mongoClientPromise';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.ENVIRONMENT }),
  session: {strategy: "jwt"},
  ...authConfig,
});
