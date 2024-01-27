import UserModel from '@/lib/models/user.model';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (_id: string) => {
  try {
    const user = await UserModel.findOne({ _id });

    return user;
  } catch {
    return null;
  }
};
