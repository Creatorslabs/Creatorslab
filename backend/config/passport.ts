import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { Strategy as TwitterStrategy } from "passport-twitter";
import User, { IUser } from "../models/User";

// Define the Passport user type explicitly
declare global {
  namespace Express {
    interface User extends IUser {} // Extending Express User type with our IUser model
  }
}

// Configure Discord OAuth strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id });

        if (!user) {
          user = new User({
            provider: "discord",
            providerId: profile.id,
            name: profile.username,
            email: profile.email || "",
            photo: profile.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
              : "",
            balance: 3,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("Discord Auth Error:", err);
        return done(null);
      }
    }
  )
);

// Configure Twitter OAuth strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
      callbackURL: "http://localhost:5000/api/auth/twitter/callback",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id });

        if (!user) {
          user = new User({
            provider: "twitter",
            providerId: profile.id,
            name: profile.displayName,
            email: (profile.emails && profile.emails[0]?.value) || "",
            photo: profile.photos?.[0]?.value || "",
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("Twitter Auth Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user: IUser, done) => {
  if (!user || !user._id) {
    return done(new Error("User object is not defined or missing _id"), null);
  }
  done(null, user._id.toString()); // Ensure the ID is stored as a string
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"), undefined);
    }
    done(null, user); 
  } catch (err) {
    console.error("Deserialize User Error:", err);
    done(err, undefined); 
  }
});


export default passport;
