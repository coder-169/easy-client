import Account from "@/app/models/Account";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const getHeaders = await headers();
  const id = getHeaders.get("id");
  try {
    const { balance, address } = await req.json();
    console.log(balance, address);

    const objectId = new mongoose.Types.ObjectId(id);
    const user = await Account.findOne({ accountId: objectId });

    if (!user)
      return NextResponse.json({
        success: false,
        message: "Invalid identification!",
      });
    user.address = address;
    user.balanceEth = parseFloat(balance);
    await user.save();
    console.log(user);
    return NextResponse.json({
      success: true,
      message: "Balance found successfully",
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
