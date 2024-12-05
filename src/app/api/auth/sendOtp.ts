// // src/pages/api/auth/sendOtp.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';
// import { v4 as uuidv4 } from 'uuid';

// const otps = new Map();

// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Or use another email service
//     auth: {
//         user: process.env.EMAIL, // Your email
//         pass: process.env.EMAIL_PASSWORD, // Your email password
//     },
// });

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === 'POST') {
//         const { email } = req.body;
        
//         // Generate an OTP
//         const otp = uuidv4().slice(0, 6); // 6-digit OTP
//         otps.set(email, otp);
        
//         // Send OTP email
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: 'Your OTP for CreatorsLab Signup',
//             text: `Your OTP is: ${otp}`,
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             return res.status(200).json({ message: 'OTP sent' });
//         } 
//         catch (error) {
//             return res.status(500).json({ error: 'Failed to send OTP' });
//         }
//     }
// };
