import Account from "@/app/models/Account";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
  const getHeaders = await headers();
  const id = getHeaders.get("id");

  const { amount } = await req.json();

  try {
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({
        success: false,
        message: "Invalid identification!",
      });

    const ethResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr"
    );
    const ethToPkr = ethResponse.data.ethereum.pkr * parseFloat(amount);
    const accountId = new mongoose.Types.ObjectId(user._id);
    const account = await Account.findOne({ accountId });
    console.log(accountId)
    console.log(account)

    account.balancePkr += ethToPkr;
    account.balanceEth -= parseFloat(amount);

    await account.save();
    return NextResponse.json({
      success: true,
      message: "Converted amount transferred to your account!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
