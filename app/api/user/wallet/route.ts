import { ethers, isAddress,formatEther } from "ethers";
import { NextResponse } from "next/server";
const providers = new ethers.AlchemyProvider(
  "sepolia",
  "vqpCd47FrQL_TBwuKXJOK2oOCr123yr-"
);

export async function POST(req: NextResponse) {
  try {
    const { address } = await req.json();
    console.log(address);
    if (!isAddress(address)) {
      throw new Error("Invalid Ethereum address");
    }

    // Connect to the Sepolia test network using Alchemy

    // Get the balance in Wei (smallest unit of Ether)
    const balanceWei = await providers.getBalance(address);
    console.log(balanceWei)
    // Convert balance from Wei to Ether
    const balanceEther = formatEther(balanceWei);

    return NextResponse.json({
      success: true,
      balanceEther,
      message: "Balance found successfully",
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
