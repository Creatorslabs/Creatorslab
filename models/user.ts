import { generateReferralCode } from "@/actions/generate-referal-code";
import { Schema, model, Document, models } from "mongoose";

// User Interface
export interface IUser extends Document {
  _id: string;
  photo: string;
  name: string;
  username?: string;
  role: "user" | "creator";
  referralCode?: string;
  referredBy?: string | null; 
  referralCount: number;
  balance: number;
  lastLoginDate: Date | null;
  followingCreators: string[];
  followers: string[];
  createdTasks: string[];
  participatedTasks: {
    task: string;
    status: "pending" | "completed" | "claimed";
    proof: string;
  }[];
}

// Task Interface
export interface ITask extends Document {
  creator: string; // Privy user ID as string
  type: "like" | "follow" | "comment" | "repost" | "quote";
  platform: "twitter" | "youtube" | "tiktok" | "facebook";
  description: string;
  target: string;
  rewardPoints: number;
  maxParticipants: number;
  participants: string[];
  status?: "active" | "completed";
  expiration?: Date;
  createdAt: string;
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true }, // Privy ID stored as a string
    photo: String,
    name: String,
    username: {
      type: String,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      index: true,
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
      default: generateReferralCode,
    },
    referredBy: {
      type: String, // Reference another user by Privy ID
      ref: "User",
      default: null,
    },
    referralCount: { type: Number, default: 0 },
    balance: {
      type: Number,
      default: 3,
      min: [0, "Balance cannot be negative"],
    },
    lastLoginDate: { type: Date, default: null },
    role: {
      type: String,
      enum: ["user", "creator"],
      default: "user",
      required: true,
    },
    followingCreators: [{ type: String, ref: "User" }], // Store as string
    followers: [{ type: String, ref: "User" }], // Store as string
    createdTasks: [{ type: String, ref: "Task" }],
    participatedTasks: [
      {
        task: { type: String, ref: "Task", required: true },
        status: {
          type: String,
          enum: ["pending", "completed", "claimed"],
          default: "pending",
        },
        proof: String,
      },
    ],
  },
  { timestamps: true }
);

// Task Schema
const TaskSchema = new Schema<ITask>({
  creator: { type: String, ref: "User", required: true }, // Privy ID as string
  type: {
    type: String,
    enum: ["like", "follow", "comment", "repost", "quote"],
  },
  platform: {
    type: String,
    enum: ["twitter", "youtube", "tiktok", "facebook"],
  },
  description: { type: String, required: true },
  target: { type: String, required: true },
  rewardPoints: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  participants: [{ type: String, ref: "User", default: [] }], // Store as string
  status: { type: String, enum: ["active", "completed"], default: "active" },
  expiration: Date,
});

// Pre-save hook to check if task is filled
TaskSchema.pre("save", function (next) {
  if (this.participants.length >= this.maxParticipants) {
    this.status = "completed";
  }
  next();
});

const User = models.User || model<IUser>("User", UserSchema);
const Task = models.Task || model<ITask>("Task", TaskSchema);

export { User, Task };
