import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, email } = await req.json();
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    const currentDate = new Date();
    const expiryDate = new Date(user.code.expiry);
    if (user.code.code === code) {
      if (currentDate > expiryDate) {
        return NextResponse.json(
          {
            success: false,
            message: "Verification code has expired",
          },
          { status: 400 }
        );
      }

      user.isVerified = true;
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Code verified",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
