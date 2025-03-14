export const generateTaskTitle = (type: string, platform: string, creator: string) => {
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
  return `${typeMap[type]} ${creator}'s ${platformMap[platform]} ${
    type === "follow" ? "account" : "post"
  }`;
};
