import mongoose, { Document, Model, model, Schema } from 'mongoose';
import { IAccount } from './accounts.model';


export interface IUser extends Document {
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  accounts: IAccount[]
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    emailVerified: { type: Date },
    image: { type: String },
    password: {type: String },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
  },
  { timestamps: true }
);

// const UserModel = mongoose.model<IUser> || model<IUser>('User', UserSchema);
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;