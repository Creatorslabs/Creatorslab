import { model, models, Document, Schema } from "mongoose";

interface IEngagementType extends Document {
  name: string;
}

const engagementTypeSchema = new Schema<IEngagementType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Check if the model already exists to prevent re-compiling issues in serverless environments
const EngagementType =
  models.EngagementType ||
  model<IEngagementType>("EngagementType", engagementTypeSchema);

export default EngagementType;
