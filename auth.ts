import NextAuth from 'next-auth';
import mongoClientPromise from './lib/database/mongoClientPromise';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise),
  session: {strategy: "jwt"},
  ...authConfig,
});
