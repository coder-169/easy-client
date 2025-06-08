import Transaction from "@/app/models/Transaction";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
const provider = new ethers.AlchemyProvider(
  "sepolia",
  "vqpCd47FrQL_TBwuKXJOK2oOCr123yr-"
);

// const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/vqpCd47FrQL_TBwuKXJOK2oOCr123yr-");
const platformPrivateKey = process.env.PRIVATE_KEY!; // Replace with your wallet's private key
const wallet = new ethers.Wallet(platformPrivateKey, provider);

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const { account, address, amount, currency, email } = body;
    if (currency.toLowerCase() !== "eth") {
      const tt = await Transaction.create({
        userId: "1234",
        name: "hello",
        email,
        amount,
        account,
        category: "Payment",
      });
    } else {
      if (!ethers.isAddress(address)) {
        throw new Error("Invalid recipient address");
      }

      // Create the transaction
      const tx = {
        to: address,
        from: "0xB04b5DF63C33C60110F4398932478a3232BB7850",
        value: ethers.parseEther(amount), // Convert Ether to Wei
        gasPrice: ethers.parseUnits("20", "gwei"), // Lower gas price in Gwei
      };

      // Send the transaction
      const transactionResponse = await wallet.sendTransaction(tx);

      console.log("Transaction hash:", transactionResponse.hash);

      // Wait for the transaction to be mined
      const receipt = await transactionResponse.wait();
      console.log("Transaction successful:", receipt);

      return NextResponse.json({
        success: true,
        transactionHash: receipt?.transactionHash,
      });
    }
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
