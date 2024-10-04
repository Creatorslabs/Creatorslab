// src/pages/api/auth/verifyOtp.ts
import { NextApiRequest, NextApiResponse } from 'next';

let otps = new Map();

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { email, otp } = req.body;

    const validOtp = otps.get(email);

    if (validOtp === otp) {
        otps.delete(email); // Remove OTP after successful verification
        return res.status(200).json({ message: 'OTP verified' });
    } else {
        return res.status(400).json({ error: 'Invalid OTP' });
    }
};
