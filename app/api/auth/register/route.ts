import { ethers } from "ethers";
import User from "../../../models/User";
import dbConnect from "../../../../utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Account from "@/app/models/Account";
import { generateAccountNumber } from "@/app/lib/utils";
// const provider = new ethers.AlchemyProvider(
//   "sepolia",
//   "vqpCd47FrQL_TBwuKXJOK2oOCr123yr-"
// );

export async function POST(req: NextResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);
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

    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
