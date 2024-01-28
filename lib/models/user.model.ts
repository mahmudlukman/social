import mongoose, { Document, Model, model, models, Schema } from 'mongoose';
import { IAccount } from './accounts.model';


export interface IUser extends Document {
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  accounts: IAccount[]
}

const UserSchema: Schema<IUser> = new Schema(
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

const UserModel: Model<IUser> =
  (mongoose.models && mongoose.models.User) ||
  mongoose.model<IUser>('User', UserSchema);
// const UserModel = mongoose.model<IUser>('User', UserSchema);
// const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// export default UserModel;
// const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;