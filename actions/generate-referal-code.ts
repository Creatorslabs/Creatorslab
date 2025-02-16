import crypto from "crypto";

export const generateReferralCode = () => {
  return crypto.randomBytes(4).toString("hex").toUpperCase(); // Generates an 8-character unique code
};

export function generateRandomUsername(): string {
  // Generate a random number between 0 and 99999 (inclusive)
  const randomNum = Math.floor(Math.random() * 100000);
  // Convert the number to a string and pad with zeros to ensure it has 5 digits
  const randomNumStr = randomNum.toString().padStart(5, "0");
  return `user${randomNumStr}`;
}
