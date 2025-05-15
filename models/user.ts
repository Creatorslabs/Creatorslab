import { generateReferralCode } from "@/actions/generate-referal-code";
import { Schema, model, Document, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  photo: string;
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
    status: "pending" | "completed";
    proof: string;
  }[];
}

export interface ITask extends Document {
  creator: string;
  title: string;
  type: "like" | "follow" | "comment" | "repost" | "quote" | "referral" | "subscribe";
  platform: "twitter" | "youtube" | "tiktok" | "facebook" | "referral";
  image: string;
  description: string;
  target: string;
  rewardPoints: number;
  maxParticipants: number;
  participants: string[];
  status?: "active" | "completed";
  expiration?: Date;
  createdAt: string;
}

const UserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    photo: String,
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
      type: String,
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
    followingCreators: [{ type: String, ref: "User" }],
    followers: [{ type: String, ref: "User" }],
    createdTasks: [{ type: String, ref: "Task" }],
    participatedTasks: [
      {
        task: { type: String, ref: "Task", required: true },
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending",
        },
        proof: String,
      },
    ],
  },
  { timestamps: true }
);

const TaskSchema = new Schema<ITask>({
  creator: { type: String, ref: "User", required: true },
  title: {type: String, required: true},
  type: {
    type: String,
    enum: ["like", "follow", "comment", "repost", "quote", "referral", "subscribe"],
  },
  platform: {
    type: String,
    enum: ["twitter", "youtube", "tiktok", "facebook", "referral"],
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  target: { type: String, required: true },
  rewardPoints: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  participants: [{ type: String, ref: "User", default: [] }],
  status: { type: String, enum: ["active", "completed"], default: "active" },
  expiration: Date,
}, {
  timestamps: true
});

TaskSchema.pre("save", function (next) {
  if (this.participants.length >= this.maxParticipants) {
    this.status = "completed";
  }
  next();
});

const User = models.User || model<IUser>("User", UserSchema);
const Task = models.Task || model<ITask>("Task", TaskSchema);

export { User, Task };
