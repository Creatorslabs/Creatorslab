import { Types } from "mongoose";

interface ITask {
  creator: {
    username: string;
    id: string;
  };
  type: "like" | "follow" | "comment" | "repost" | "quote";
  platform: "twitter" | "youtube" | "tiktok" | "facebook";
  target: string;
  rewardPoints: number;
  maxParticipants: number;
  participants: Types.ObjectId[]; 
  status?: "active" | "completed"; 
  expiration?: Date;
}

export const generateTaskTitle = (task: ITask) => {
  const { type, platform, creator } = task;
  const platformMap = {
    twitter: "Twitter",
    youtube: "YouTube",
    tiktok: "TikTok",
    facebook: "Facebook",
  };
  const typeMap = {
    like: "Like",
    follow: "Follow",
    comment: "Comment",
    repost: "Repost",
    quote: "Quote",
  };
  return `${typeMap[type]} ${creator.username}'s ${platformMap[platform]} ${
    type === "follow" ? "account" : "post"
  }`;
};
