"use client";
import React, { useContext, useState } from "react";
import Heading from "@/app/components/Heading";
import { toast } from "sonner";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import { Loader2 } from "lucide-react";
import { TransactionContext } from "@/app/context/TransactionContext";
import { getSession } from "next-auth/react";

const Page = () => {
  const {
    sendTransaction,
    isLoading,
    formData,
    handleChangeData,
    currentAccount,
  } = useContext(TransactionContext);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("eth");
  const [account, setAccount] = useState({
    amount: "",
    account: "",
    email: "",
  });

  const handleAccountChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleTransfer = async () => {
    try {
      const fastSession = await getSession();
      if (currency.toLowerCase() === "eth") {
        sendTransaction();
      } else {
        setLoading(true);
        toast.info("Processing Transaction!");
        const resp = await fetch("/api/user/payment/transfer", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            id: fastSession?.user?._id || "",
          },
          body: JSON.stringify({
            ...account,
            sender: fastSession?.user?.username,
          }),
        });
        const data = await resp.json();

        if (data.success) {
          toast.success(data.message);
          setAccount({
            amount: "",
            account: "",
            email: "",
          });
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 mx-2 sm:mx-4 md:mx-8 lg:mx-16">
      <Heading
        title="Payment Transfer"
        subtitle="Provide details related to payment transfer"
      />
      <div className="bg-n-7 p-2 sm:p-4 rounded-xl mt-8 flex items-center justify-between mx-auto relative z-40 w-full max-w-[420px]">
        <span
          className={`absolute top-[10%] w-[46%] h-4/5 rounded-xl bg-n-8 text-white transition-transform duration-300 ease-in-out z-20`}
          style={{
            transform:
              currency === "eth" ? "translateX(0%)" : "translateX(100%)",
          }}
        ></span>

        <button
          onClick={() => setCurrency("eth")}
          disabled={isLoading}
          className={`disabled:opacity-70 disabled:pointer-events-none relative z-30 rounded-xl px-2 sm:px-4 py-2 w-[48%] font-semibold transition-colors duration-300 ${
            currency === "eth" ? "text-white" : "text-n-2"
          }`}
        >
          ETH
        </button>

        <button
          onClick={() => setCurrency("pkr")}
          disabled={isLoading}
          className={`disabled:opacity-70 disabled:pointer-events-none relative z-30 rounded-xl px-2 sm:px-4 py-2 w-[48%] font-semibold transition-colors duration-300 ${
            currency === "pkr" ? "text-white" : "text-n-2"
          }`}
        >
          PKR
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mt-8 text-n-1">
        Transfer Details
      </h2>
      <p className="text-sm text-n-4">Enter the details</p>

      {/* Transfer Note */}
      <div
        className={`${
          currency === "pkr"
            ? "opacity-80 pointer-events-none cursor-not-allowed"
            : ""
        } flex flex-col sm:flex-row gap-4 items-start sm:items-center py-4`}
      >
        <div className="w-full sm:w-1/3">
          <h3 className="text-base font-semibold text-n-1">
            Transfer Note(optional)
          </h3>
          <p className="text-sm text-n-4">
            Please provide any additional information or instructions related to
            transfer
          </p>
        </div>
        <textarea
          rows={5}
          value={formData.message}
          onChange={handleChangeData}
          name="message"
          autoComplete="off"
          readOnly={currency === "pkr" ? true : false}
          className={`resize-none w-full sm:w-2/3 bg-transparent bg-opacity-30 px-3 rounded-xl border block focus:border-n-4 !outline-none border-n-6 transition-all !ring-0 duration-300 ease-in text-base text-n-1`}
          placeholder="Dear John, I hope this message finds you well, I am transferring $100 to your account. Lmk when you receive."
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
              <h3 className="text-sm md:text-base font-medium text-n-3">
                address
              </h3>
            </div>
            <CustomInput
              type="text"
              hint="0x...fdsa"
              value={formData.addressTo}
              handler={handleChangeData}
              name="addressTo"
              classes="w-full md:!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-sm md:text-base font-medium text-n-3">
                Keyword
              </h3>
            </div>
            <CustomInput
              type="text"
              hint="Keyword"
              value={formData.keyword}
              handler={handleChangeData}
              name="keyword"
              classes="w-full md:!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-sm md:text-base font-medium text-n-3">
                Amount
              </h3>
            </div>
            <CustomInput
              type="number"
              hint="0.02"
              value={formData.amount}
              handler={handleChangeData}
              name="amount"
              classes="w-full md:!w-2/4"
            />
          </div>

          <Button
            white
            loading={isLoading}
            disabled={!formData.addressTo || !formData.amount || isLoading}
            onClick={handleTransfer}
            className="w-full md:w-1/4"
          >
            Send Now
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
              <h3 className="text-sm md:text-base font-medium text-n-3">
                Email
              </h3>
            </div>
            <CustomInput
              type="email"
              hint="johnboe@gmail.com"
              value={account.email}
              handler={handleAccountChange}
              name="email"
              classes="w-full md:!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-sm md:text-base font-medium text-n-3">
                Account Number
              </h3>
            </div>
            <CustomInput
              type="text"
              hint="1193243281813"
              value={account.account}
              handler={handleAccountChange}
              name="account"
              classes="w-full md:!w-2/4"
            />
          </div>
          <div className="flex gap-4 items-center py-4">
            <div className="w-1/3">
              <h3 className="text-sm md:text-base font-medium text-n-3">
                Amount
              </h3>
            </div>
            <CustomInput
              type="number"
              hint="20000"
              value={account.amount}
              handler={handleAccountChange}
              name="amount"
              classes="w-full md:!w-2/4"
            />
          </div>
          <Button
            white
            loading={loading}
            disabled={
              !account.email ||
              !account.account ||
              !account.amount ||
              isLoading ||
              !currentAccount
            }
            onClick={handleTransfer}
            className="w-full md:w-1/4"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
