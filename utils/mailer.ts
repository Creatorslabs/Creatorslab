import nodemailer from "nodemailer";
import { otpEmailTemplate } from "./emailTemplate";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  const verificationLink = `https://yourapp.com/verify?otp=${otp}`;

  const emailContent = otpEmailTemplate(email, otp, verificationLink);

  const textContent = `
Hi ${email},

Your One-Time Password (OTP) is: ${otp}

This OTP is valid for 10 minutes. Do not share it with anyone.

To verify, click here: ${verificationLink}

If you didn’t request this, please ignore this email.

Best, 
Your Company
`;

  await transporter.sendMail({
    from: "CreatorsLab <no-reply@creatorslab.com>",
    to: email,
    subject: "Your OTP Code for Verification",
    text: textContent,
    html: emailContent,
  });
}
