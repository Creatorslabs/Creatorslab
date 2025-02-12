import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    providers: string[];
    providerIds: { [provider: string]: string };
    photo?: string;
    username?: string;
    referralCode?: string;
    referredBy?: string | null;
    referralCount: number;
    balance: number;
    isVerified: boolean;
    discordVerified: boolean;
    twitterVerified: boolean;
    emailVerified: boolean;
    lastLoginDate: Date | null;
    token?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    providers: string[];
    providerIds: { [provider: string]: string };
    photo?: string;
    username?: string;
    referralCode?: string;
    referredBy?: string | null;
    referralCount: number;
    balance: number;
    isVerified: boolean;
    discordVerified: boolean;
    twitterVerified: boolean;
    emailVerified: boolean;
    lastLoginDate: Date | null;
    token?: string;
  }
}
