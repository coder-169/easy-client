import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, email } = await req.json();
console.log(code, email);
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    console.log(user.code.code, code);

    if (user.code.code === code) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json({ success: true, message: "code verified" });
    }
    return NextResponse.json({
      success: false,
      message: "code expired or incorrect!",
    });
    //   check expiry
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
