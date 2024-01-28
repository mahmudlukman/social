'use server';
import * as z from 'zod';
import { RegisterSchema } from '@/lib/schemas';
// import UserModel from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { connectToDB } from '@/lib/database/mongoose';
import User from '@/lib/models/user.model';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  connectToDB()
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // TODO: send verification token email
  return { success: 'User created!' };
};
