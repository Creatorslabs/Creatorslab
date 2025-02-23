// import {
//   generateRandomUsername,
//   generateReferralCode,
// } from "@/actions/generate-referal-code";
// import { User } from "@/models/user";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import { NextAuthOptions } from "next-auth";
// import connectDB from "./connectDB";
// import clientPromise from "./mongoDB";

// import DiscordProvider from "next-auth/providers/discord";
// import TwitterProvider from "next-auth/providers/twitter";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID!,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET!,
//     }),
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID!,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { otp, email } = credentials as { otp: string; email: string };

//         if (!email || !otp) {
//           throw new Error("Missing email or OTP");
//         }

//         try {
//           await connectDB();

//           const user = await User.findOne({ email }).select(
//             "+verificationCode +otpExpires"
//           );

//           if (!user) {
//             throw new Error("Invalid credentials");
//           }

//           // Check OTP expiration
//           if (user.otpExpires && new Date(user.otpExpires) < new Date()) {
//             throw new Error("OTP expired");
//           }

//           if (user.verificationCode !== otp) {
//             throw new Error("Invalid credentials");
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name || user.username,
//             role: user.role,
//           };
//         } catch (error) {
//           console.error("Authentication fail: ", (error as Error).message);
//           throw new Error((error as Error).message);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       await connectDB();

//       // Only handle OAuth providers here
//       if (account?.provider !== "credentials") {
//         console.log(`OAuth signIn attempt for provider: ${account?.provider}`);
//         const existingUser = await User.findOne({
//           $or: [
//             { email: user.email },
//             {
//               [`providerIds.${account?.provider}`]: account?.providerAccountId,
//             },
//           ],
//         });

//         if (existingUser) {
//           // Merge accounts if email matches but provider ID is new
//           if (!existingUser.providers.includes(account?.provider)) {
//             await User.updateOne(
//               { _id: existingUser._id },
//               {
//                 $addToSet: { providers: account?.provider },
//                 $set: {
//                   [`providerIds.${account!.provider}`]:
//                     account!.providerAccountId,
//                 },
//               }
//             );
//           }

//           // Update user object for session
//           user.id = existingUser._id.toString();
//           user.role = existingUser.role;
//           return true;
//         }
//       }

//       // Allow new user creation for OAuth or proceed with credentials
//       return true;
//     },
//     async jwt({ token, user, account }) {
//       // Initial sign-in
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       // Add provider info to token
//       if (account) {
//         token.provider = account.provider;
//         token.providerId = account.providerAccountId;
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.user.role = token.role as string;
//       session.user.provider = token.provider as string;
//       return session;
//     },
//   },
//   events: {
//     async createUser({ user }) {
//       // Connect to the database
//       await connectDB();

//       // Update the new user with your default fields.
//       // This runs after NextAuth creates the user using the adapter.
//       await User.findByIdAndUpdate(
//         user.id,
//         {
//           // Set defaults if they aren't already provided.
//           // Adjust these values as needed.
//           username: generateRandomUsername(),
//           referralCode: generateReferralCode(),
//           providers: user.provider || ["email"],
//           role: user.role || "user",
//           referredBy: null,
//           balance: 3,
//           isVerified: false,
//           emailVerified: false,
//           lastLoginDate: null,
//         },
//         { new: true }
//       );
//     },
//     async signIn({ user }) {
//       try {
//         await connectDB();
//         const dbUser = await User.findById(user.id);
//         if (!dbUser) return;

//         const now = new Date();
//         const lastLogin = dbUser.lastLogin ? new Date(dbUser.lastLogin) : null;

//         if (!lastLogin || lastLogin.toDateString() !== now.toDateString()) {
//           dbUser.balance += 0.3; // Apply daily bonus
//           dbUser.lastLogin = now;
//           await dbUser.save();
//         }
//       } catch (error) {
//         console.error("Error in signIn event:", error);
//       }
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: process.env.NEXTAUTH_SECRET!,
//   useSecureCookies: process.env.NODE_ENV === "development",
// };

import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongoDB";
import connectDB from "./connectDB";
import { User } from "@/models/user";

export const authOptions: NextAuthOptions = {
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
      authorization: {
        params: {
          scope: "users.read tweet.read offline.access",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { otp, email } = credentials as { otp: string; email: string };

        if (!email || !otp) {
          throw new Error("Missing email or OTP");
        }

        try {
          await connectDB();

          const user = await User.findOne({ email }).select(
            "+verificationCode +otpExpires"
          );

          if (!user) {
            throw new Error("Invalid credentials");
          }

          // Check OTP expiration
          if (user.otpExpires && new Date(user.otpExpires) < new Date()) {
            throw new Error("OTP expired");
          }

          if (user.verificationCode !== otp) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.username,
            image: user.photo,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication fail: ", (error as Error).message);
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // If user is newly authenticated (i.e., during sign-in), attach the role
      if (user) {
        token.role = (user as any).role || "user"; // Default to "user" if undefined
        token.image = user.image;
        token.provider = account?.provider;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("🎉🎉🎉 session:", session);
      console.log("Token:", token);

      if (session.user) {
        session.user.id = token.sub!;
        session.user.image = token.image as string;
        session.user.role = token.role as string; // Ensure role is assigned
        session.user.provider = token.provider as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/test",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development",
};
