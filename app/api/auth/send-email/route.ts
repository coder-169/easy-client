import { NextRequest, NextResponse } from "next/server";

// utitlity function to generate 6 digit code
function generateSixDigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    // todo => generate the code and send to email
    const code = generateSixDigitCode();
    console.log(code);
    return NextResponse.json({ code, success: true, email });
    //
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
