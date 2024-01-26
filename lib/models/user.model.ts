import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IAccount } from './accounts.model';

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password: string;
  accounts: IAccount[]
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: 'Please enter a valid email',
      },
    },
    emailVerified: { type: Date },
    image: { type: String },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
    },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
  },
  { timestamps: true }
);

// Hash Password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel };
