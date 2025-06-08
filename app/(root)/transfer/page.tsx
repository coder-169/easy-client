"use client";
import { Loader } from "@/app/components";
import React, { useState } from "react";
import Heading from "@/app/components/Heading";
import toast from "react-hot-toast";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import { Loader2 } from "lucide-react";

const Page = () => {
  // const { handleChange, isLoading } = useContext(TransactionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [transfer, setTransfer] = useState({
    amount: "",
    account: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };
  const handleTransfer = async () => {
    toast.loading("Processing Transaction", { duration: 1500 });
    setIsLoading(true);
    try {
      if (currency.toLowerCase() === "eth") {
        const resp = await fetch("/api/user/payment/transfer", {
          method: "post",
          body: JSON.stringify({
            ...transfer,
            address: transfer.account,
            currency,
          }),
        });
        const data = await resp.json();
        console.log(data);
        if (data.success) toast.success("Transaction Processed");
        else toast.error("Transaction failed");
      } else {
        const resp = await fetch("/api/user/payment/transfer", {
          method: "post",
          body: JSON.stringify({
            ...transfer,
            currency,
            account: transfer.account,
          }),
        });
        const data = await resp.json();
        if (data.success) toast.success("Transaction Processed");
        else toast.error("Transaction failed");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8 mx-16">
      <Heading
        title="Payment Transfer"
        subtitle="Provide details related to payment transfer"
      />
      <div className="bg-n-7 p-4 rounded-xl mt-8 flex items-center justify-between mx-auto relative z-40 w-[420px]">
        {/* Highlight Background */}
        <span
          className={`absolute top-[10%] w-[46%] h-4/5 rounded-xl bg-n-8 text-white transition-transform duration-300 ease-in-out z-20`}
          style={{
            transform:
              currency === "eth" ? "translateX(0%)" : "translateX(100%)",
          }}
        ></span>

        {/* ETH Button */}
        <button
          onClick={() => setCurrency("eth")}
          className={`relative z-30 rounded-xl px-4 py-2 w-[200px] font-semibold transition-colors duration-300 ${
            currency === "eth" ? "text-white" : "text-n-2"
          }`}
        >
          ETH
        </button>

        {/* PKR Button */}
        <button
          onClick={() => setCurrency("pkr")}
          className={`relative z-30 rounded-xl px-4 py-2 w-[200px] font-semibold transition-colors duration-300 ${
            currency === "pkr" ? "text-white" : "text-n-2"
          }`}
        >
          PKR
        </button>
      </div>

      <h2 className="text-2xl font-semibold mt-8 text-n-1">Transfer Details</h2>
      <p className="text-sm text-n-4">Enter the details</p>

      <div className="flex gap-4 items-center py-4">
        <div className="w-1/3">
          <h3 className="text-base font-semibold text-n-1">
            Transfer Note(optional)
          </h3>
          <p className="text-sm  text-n-4">
            Please provide any additional information or instructions related to
            transfer
          </p>
        </div>
        <textarea
          rows={5}
          value={transfer.message}
          onChange={handleChange}
          name="message"
          autoComplete="off"
          className={`resize-none w-2/4 bg-transparent bg-opacity-30 px-3 rounded-xl border block focus:border-n-4 !outline-none border-n-6  transition-all !ring-0 duration-300 ease-in text-base text-n-1`}
          placeholder={
            "Dear John, I hope this message finds you well, I am transferring $100 to your account. Lmk when you receive.</div>"
          }
        ></textarea>
      </div>
      <div className="overflow-hidden relative w-full h-[500px]">
        {/* Wallet Details Form (only for ETH) */}
        <div
          style={{
            transform:
              currency === "eth" ? "translateX(0%)" : "translateX(-100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          className="absolute w-full h-full rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-medium mt-8 text-n-1">Wallet Details</h2>
          <p className="text-sm text-n-4">
            Enter the wallet address of the recipient
          </p>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-base font-medium text-n-3">
                Recipient&apos;s email address
              </h3>
            </div>
            <CustomInput
              type="email"
              hint="johnboe@gmail.com"
              value={transfer.email}
              handler={handleChange}
              name="email"
              classes="!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-base font-medium text-n-3">
                Recipient&apos;s Network Address
              </h3>
            </div>
            <CustomInput
              type="text"
              hint="0xEA..."
              value={transfer.account}
              handler={handleChange}
              name="account"
              classes="!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-base font-medium text-n-3">Amount</h3>
            </div>
            <CustomInput
              type="number"
              hint="0.02"
              value={transfer.amount}
              handler={handleChange}
              name="amount"
              classes="!w-2/4"
            />
          </div>
          <Button
            // onClick={handleTransfer}
            // type="button"
            // className="hover: w-1/4 ml-auto mt-2 border-[1px] p-2 border-[#3d4f7c] text-[#3d4f7c] hover:text-white hover:bg-[#3d4f7c] rounded-full cursor-pointer font-bold"
            white
            disabled={
              !transfer.email ||
              !transfer.account ||
              !transfer.amount ||
              isLoading
            }
            onClick={handleTransfer}
          >
            {isLoading ? (
              <span className="flex justify-between items-center gap-4">
                Sending <Loader2 className="animate-spin size-4" />
              </span>
            ) : (
              "Send now"
            )}
          </Button>
        </div>

        {/* Bank Details Form (only for PKR) */}
        <div
          style={{
            transform:
              currency === "eth" ? "translateX(100%)" : "translateX(0%)",
            transition: "transform 0.3s ease-in-out",
          }}
          className="absolute w-full h-full rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-medium mt-8 text-n-1">
            Bank Account Details
          </h2>
          <p className="text-sm text-n-4">
            Enter the bank account details of the recipient
          </p>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-base font-medium text-n-3">
                Recipient&apos;s Email Address
              </h3>
            </div>
            <CustomInput
              type="email"
              hint="johnboe@gmail.com"
              value={transfer.email}
              handler={handleChange}
              name="email"
              classes="!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-base font-medium text-n-3">
                Recipient&apos;s Account Number
              </h3>
            </div>
            <CustomInput
              type="text"
              hint="1193243281813"
              value={transfer.account}
              handler={handleChange}
              name="account"
              classes="!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-base font-medium text-n-3">
                Recipient&apos;s Amount
              </h3>
            </div>
            <CustomInput
              type="number"
              hint="20000"
              value={transfer.amount}
              handler={handleChange}
              name="amount"
              classes="!w-2/4"
            />
          </div>
          <Button
            white
            disabled={
              !transfer.email ||
              !transfer.account ||
              !transfer.amount ||
              isLoading
            }
          >
            {isLoading ? (
              <span className="flex justify-between items-center gap-4">
                Sending <Loader2 className="animate-spin size-4" />
              </span>
            ) : (
              "Send now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
