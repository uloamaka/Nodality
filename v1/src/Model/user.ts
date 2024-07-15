import { model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  role: 'Basic' | 'Admin';
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Basic', 'Admin'],
      default: 'Basic',
    },
  },
  {
    required: true,
    timestamps: true,
  }
);
export const User = model<IUser>('User', userSchema);
