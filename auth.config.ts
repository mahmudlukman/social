import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import Google from "next-auth/providers/google"
import { LoginSchema } from './lib/schemas';
import { getUserByEmail } from './data/user';
import {connectToDB} from './lib/database/mongoose';


export default {
  providers: [
    Credentials({
      async authorize(credentials) {
      
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig