import { model, models, Document, Schema, Types } from "mongoose";

interface ITask extends Document {
  image: string;
  title: string;
  socialPlatform: Types.ObjectId[];
  engagementType: Types.ObjectId[];
  rate: number;
  description: string;
  taskLink: string;
  taskPrice: number;
  user: Types.ObjectId[];
}

const taskSchema = new Schema<ITask>(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    socialPlatform: [
      {
        type: Schema.Types.ObjectId,
        ref: "SocialPlatform",
        required: true,
      },
    ],
    engagementType: [
      {
        type: Schema.Types.ObjectId,
        ref: "EngagementType",
        required: true,
      },
    ],
    rate: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    taskLink: {
      type: String,
      required: true,
      trim: true,
    },
    taskPrice: {
      type: Number,
      required: true,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Check if the model already exists to prevent duplication
const Task = models.Task || model<ITask>("Task", taskSchema);

export default Task;
