import { User } from "@privy-io/react-auth";

export const isVerified = (user: User): boolean => {
  return !!(user?.discord && user?.email && user?.twitter);
};
