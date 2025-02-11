import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
const EMAIL_USER = process.env.EMAIL_USER as string;
const EMAIL_PASS = process.env.EMAIL_PASS as string;

if (!JWT_SECRET || !EMAIL_USER || !EMAIL_PASS) {
  throw new Error("Missing required environment variables");
}
 
const generateToken = (userId: string): string => {
  return jwt.sign({ user: { id: userId } }, JWT_SECRET, { expiresIn: "1h" });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ token: generateToken(newUser.id) });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "User not found, please register!" });
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({ token: generateToken(user.id) });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  try {
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      res.json({
        token: generateToken(user.id),
        msg: "Email already verified.",
      });
    }

    if (!user) {
      user = new User({ email, verificationCode });
      await user.save();
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    });

    res
      .status(201)
      .json({ msg: "User registered. Check email for verification code." });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== verificationCode) {
      res.status(400).json({ msg: "Invalid verification code or email" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.json({
      token: generateToken(user.id),
      msg: "Email verified successfully.",
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
