import Account from "@/app/models/Account";
import Transaction from "@/app/models/Transaction";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const getHeaders = await headers();
    const id = getHeaders.get("id");
    if (!id)
      return NextResponse.json(
        { success: false, message: "Invalid authentication" },
        { status: 401 }
      );

    const { sender, account, amount, email } = body;

    const receivingUser = await Account.findOne({ accountNumber: account });
    const sendingUser = await Account.findOne({ accountId: id });

    const tt = await Transaction.create({
      userId: id,
      name: sender,
      email,
      amount,
      senderAcc: sendingUser.accountNumber,
      receiverAcc: receivingUser.accountNumber,
    });

    if (!receivingUser) {
      return NextResponse.json(
        { success: false, message: "Receiving user not found" },
        { status: 400 }
      );
    }
    if (!sendingUser) {
      return NextResponse.json(
        { success: false, message: "Sending user not found" },
        { status: 400 }
      );
    }
    if (sendingUser.balancePkr < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficient funds in account!",
        },
        { status: 400 }
      );
    }

    receivingUser.balancePkr += parseFloat(amount);
    sendingUser.balancePkr -= parseFloat(amount);
    tt.status = "Paid";
    await receivingUser.save();
    await sendingUser.save();
    await tt.save();

    return NextResponse.json({
      success: true,
      message: "Transaction Successful!",
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
