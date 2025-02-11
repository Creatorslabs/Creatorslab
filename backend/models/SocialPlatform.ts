import { model, models, Document, Schema } from "mongoose";

interface ISocialPlatform extends Document {
  name: string;
}

const socialPlatformSchema = new Schema<ISocialPlatform>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Check if the model already exists to prevent duplication
const SocialPlatform =
  models.SocialPlatform ||
  model<ISocialPlatform>("SocialPlatform", socialPlatformSchema);

export default SocialPlatform;
