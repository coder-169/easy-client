import User from "../../../models/User";
import dbConnect from "../../../../utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Account from "@/app/models/Account";
import { generateAccountNumber } from "@/app/lib/utils";

import nodemailer from "nodemailer";
import { generateSixDigitCode } from "@/lib/utils";

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

export async function POST(req: NextResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    let user = await User.findOne({
      username: body.username,
      email: body.email,
    });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }
    const hashed = await bcrypt.hash(body.password, 10);
    user = await User.create({ ...body, password: hashed });

    const code = generateSixDigitCode();
    user.code.code = code;
    user.code.expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // Set expiry to 10 minutes from now
    await user.save();
    // Email options
    const mailOptions = {
      from: '"Easy Krypt" <mrsajid2129@gmail.com>',
      to: body.email,
      subject: "Verification Code",
      html: `<p>Here is your verification code <b>${code}</b></p>`,
    };
    await transporter.sendMail(mailOptions);

    await Account.create({
      accountId: user._id,
      accountNumber: generateAccountNumber(),
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
