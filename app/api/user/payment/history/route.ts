import mongoose from 'mongoose'
import Account from "@/app/models/Account";
import Transaction from "@/app/models/Transaction";
import User from "@/app/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const getHeaders = await headers();
  const id = getHeaders.get("id");

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ObjectId");
      return;
    }

    const objectId = new mongoose.Types.ObjectId(id);
    // Outgoing: account is sending money
    const sentTransactions = await Transaction.find({
      userId: objectId,
    });
    const myAccount = await Account.findOne({
      accountId: objectId,
    });
    // Incoming: account is receiving money
    const receivedTransactions = await Transaction.find({
      receiverAcc: myAccount.accountNumber,
    });

    // Modify sent transactions (negative amounts)
    const modifiedSent = sentTransactions.map((tx) => ({
      ...tx.toObject(),
      amount: -Math.abs(tx.amount), // force negative
    }));

    // Modify received transactions (positive amounts)
    const modifiedReceived = receivedTransactions.map((tx) => ({
      ...tx.toObject(),
      amount: Math.abs(tx.amount), // force positive
    }));

    // Merge both
    const allTransactions = [...modifiedSent, ...modifiedReceived];

    // Optional: sort by date
    allTransactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return NextResponse.json({
      success: true,
      message: "Transactions found",
      allTransactions,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
