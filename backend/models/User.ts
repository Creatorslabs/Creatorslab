import { model, models, Document, Schema } from "mongoose";

export interface IUser extends Document {
  provider?: "discord" | "twitter";
  providerId?: string;
  photo?: string;
  name?: string;
  email: string;
  password?: string;
  referralCode?: string;
  balance: number;
  isVerified: boolean;
  verificationCode?: string | null;
}

const userSchema = new Schema<IUser>(
  {
    provider: {
      type: String,
      enum: ["discord", "twitter"],
      required: false,
    },
    providerId: {
      type: String,
      unique: true,
      required: false,
    },
    photo: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    referralCode: {
      type: String,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to prevent duplication
const User = models.User || model<IUser>("User", userSchema);

export default User;
