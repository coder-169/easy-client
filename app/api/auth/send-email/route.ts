import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

// utitlity function to generate 6 digit code
function generateSixDigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

import nodemailer from "nodemailer"

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Your SMTP server host
  port: 587, // Typically 587 for TLS, 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.PASSWORD, // Your email password or app-specific password
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    // todo => generate the code and send to email
    const code = generateSixDigitCode();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found! invalid email",
        success: false,
      });
    }
    user.code.code = code;
    user.code.expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // Set expiry to 10 minutes from now
    await user.save();
    // Email options
    const mailOptions = {
      from: '"Easy Krypt" <mrsajid2129@gmail.com>',
      to: email,
      subject: "Verification Code",
      html: `<p>Here is your verification code <b>${code}</b></p>`,
    };
    await transporter.sendMail(mailOptions);

    console.log(code);
    return NextResponse.json({ code, success: true, email });
    //
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
