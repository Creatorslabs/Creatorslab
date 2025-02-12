export const otpEmailTemplate = (
  name: string,
  otp: string,
  verificationLink: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your OTP</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 0; }
    table { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; }
    td { padding: 20px; }
    .header { text-align: center; padding: 20px; background-color: #5D3FD1; color: #ffffff; font-size: 24px; font-weight: bold; border-radius: 10px 10px 0 0; }
    .otp { font-size: 32px; font-weight: bold; color: #5D3FD1; text-align: center; padding: 15px; border: 2px dashed #5D3FD1; border-radius: 8px; background-color: #f4f4f7; letter-spacing: 5px; display: inline-block; }
    .button { text-align: center; margin-top: 20px; }
    .button a { display: inline-block; background-color: #5D3FD1; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold; }
    .footer { text-align: center; font-size: 12px; color: #777777; padding: 20px; }
    @media screen and (max-width: 600px) { .otp { font-size: 24px; padding: 10px; } .button a { padding: 10px 20px; font-size: 14px; } }
  </style>
</head>
<body>
  <table>
    <tr> <td class="header">Verify Your Account</td> </tr>
    <tr> <td><p>Hi <strong>${name}</strong>,</p><p>Your One-Time Password (OTP) for verification is:</p><p class="otp">${otp}</p><p>This OTP is valid for only <strong>10 minutes</strong>. Do not share it with anyone.</p></td> </tr>
    <tr> <td class="button"><a href="${verificationLink}" target="_blank">Verify Now</a></td> </tr>
    <tr> <td class="footer">If you did not request this OTP, please ignore this email.<br> &copy; ${new Date().getFullYear()} Your Company. All rights reserved.</td> </tr>
  </table>
</body>
</html>
`;
