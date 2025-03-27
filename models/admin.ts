import mongoose, { Document, Schema, Model } from 'mongoose';

/**
 * @interface IAdmin
 * Represents an Admin document in MongoDB.
 */
export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Admin Schema
 * Defines the structure of the Admin collection in MongoDB.
 */
const AdminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Admin Model
 * Exports the Mongoose model for interacting with the Admin collection.
 */
const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
