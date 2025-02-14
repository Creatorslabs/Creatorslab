import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { User, IUser } from "@/models/user";
import connectDB from "@/utils/connectDB";
import clientPromise from "@/utils/mongoDB";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const generateJWT = (user: Partial<IUser>): string => {
  return jwt.sign(
    {
      id: user._id?.toString(),
      email: user.email,
      providers: user.providers,
      providerIds: user.providerIds,
      photo: user.photo,
      username: user.username,
      referralCode: user.referralCode,
      referredBy: user.referredBy?.toString(),
      referralCount: user.referralCount,
      balance: user.balance,
      isVerified: user.isVerified,
      discordVerified: user.discordVerified,
      twitterVerified: user.twitterVerified,
      emailVerified: user.emailVerified,
      lastLoginDate: user.lastLoginDate,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
    CredentialsProvider({
      name: "email",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error("Missing email or otp");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found. Please request an OTP.");

        console.log(
          "User OTP:",
          typeof String(user.verificationCode).trim(),
          String(user.verificationCode).trim()
        );
        console.log(
          "Received OTP:",
          typeof String(credentials.otp).trim(),
          String(credentials.otp).trim()
        );
        console.log("OTP match:", user.verificationCode !== credentials.otp);
        console.log("Test match:", "123" !== "123");

        if (user.verificationCode !== credentials.otp) {
          throw new Error("Invalid OTP provided");
        }

        if (
          !user.otpExpires ||
          new Date(user.otpExpires).getTime() < Date.now()
        ) {
          throw new Error("OTP expired");
        }

        user.otp = "";
        user.otpExpires = null;
        user.isVerified = true;
        await user.save();

        return {
          id: user.id.toString(), // Include `id`
          email: user.email,
          providers: user.providers,
          providerIds: user.providerIds,
          photo: user.photo,
          username: user.username,
          referralCode: user.referralCode,
          referredBy: user.referredBy?.toString(),
          referralCount: user.referralCount,
          balance: user.balance,
          isVerified: user.isVerified,
          discordVerified: user.discordVerified,
          twitterVerified: user.twitterVerified,
          emailVerified: user.emailVerified,
          lastLoginDate: user.lastLoginDate,
          token: generateJWT(user),
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user.email) {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // Link new provider to existing account
          if (!existingUser.providers?.includes(account!.provider)) {
            existingUser.providers = [
              ...(existingUser.providers || []),
              account!.provider,
            ];
            existingUser.providerIds = {
              ...existingUser.providerIds,
              [account!.provider]: account!.providerAccountId, // Store providerId
            };
            await existingUser.save();
          }
          return true;
        } else {
          // Create new user with the first provider
          const newUser = new User({
            email: user.email,
            providers: [account!.provider],
            providerIds: {
              [account!.provider]: account!.providerAccountId,
            },
            balance: 5,
            referralCount: 0,
            isVerified: false,
            discordVerified: true,
            twitterVerified: true,
            emailVerified: true,
            lastLoginDate: new Date(),
          });
          await newUser.save();
          return true;
        }
      }
      return false; // Deny login if no email
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.providers = user.providers;
        token.providerIds = user.providerIds;
        token.photo = user.photo;
        token.username = user.username;
        token.referralCode = user.referralCode;
        token.referredBy = user.referredBy?.toString(); // Convert ObjectId to string
        token.referralCount = user.referralCount;
        token.balance = user.balance;
        token.isVerified = user.isVerified;
        token.discordVerified = user.discordVerified;
        token.twitterVerified = user.twitterVerified;
        token.lastLoginDate = user.lastLoginDate;
        token.token = user.token;
      } else if (token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token = {
            ...token,
            ...dbUser.toObject(),
            id: dbUser.id.toString(),
            referredBy: dbUser.referredBy?.toString(), // Convert ObjectId to string
            emailVerified: dbUser.emailVerified,
            token: generateJWT(dbUser),
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
          providers: token.providers,
          providerIds: token.providerIds,
          photo: token.photo,
          username: token.username,
          referralCode: token.referralCode,
          referredBy: token.referredBy,
          referralCount: token.referralCount,
          balance: token.balance,
          isVerified: token.isVerified,
          discordVerified: token.discordVerified,
          twitterVerified: token.twitterVerified,
          emailVerified: token.emailVerified,
          lastLoginDate: token.lastLoginDate,
          token: token.token,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async signIn({ user }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          const now = new Date();
          const lastLogin = dbUser.lastLoginDate
            ? new Date(dbUser.lastLoginDate)
            : null;

          if (!lastLogin || lastLogin.toDateString() !== now.toDateString()) {
            dbUser.balance += 0.3; // Daily bonus
            dbUser.lastLoginDate = now;
            await dbUser.save();
          }
        }
      } catch (error) {
        console.error("Daily bonus error:", error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
