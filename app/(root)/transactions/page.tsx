import AnimatedCounter from "@/app/components/AnimatedCounter";
import Heading from "@/app/components/Heading";
import TransactionsTable from "@/app/components/TransactionTable";
import { shortenAddress } from "@/app/utils/shortenAddress";
import React from "react";
import { SiEthereum } from "react-icons/si";
const data = [
  {
    _id: "43287948923942342323432",
    name: "Sajid Ali",
    email: "mrsaad2129@gmail.com",
    amount: 1234,
    status: "Success",
    category: "string",
    date: "18-12-2024",
    type: "credit",
    currency: "Pkr",
    senderAcc: "lorem",
    receiverAcc: "lorem",
    t_name: "Credit Card payment",
  },
  {
    _id: "43287948923942342323432",
    name: "Sajid Ali",
    email: "mrsaad2129@gmail.com",
    amount: -300,
    status: "Processing",
    category: "string",
    date: "18-12-2024",
    type: "credit",
    currency: "Pkr",
    senderAcc: "lorem",
    receiverAcc: "lorem",
    t_name: "Domain buying payment",
  },
  {
    _id: "43287948923942342323432",
    name: "Sajid Ali",
    email: "mrsaad2129@gmail.com",
    amount: 300,
    status: "Failed",
    category: "string",
    date: "18-12-2024",
    type: "credit",
    currency: "Eth",
    senderAcc: "lorem",
    receiverAcc: "lorem",
    t_name: "Domain buying payment",
  },
];
const Page = () => {
  return (
    <div className="my-8 mx-16">
      <div className="flex items-center justify-between">
        <Heading
          subtitle="Track your transactions over time"
          title="Transaction History"
        />
        <select
          className={`w-1/5 bg-transparent bg-opacity-30 text-gray-100 px-3 py-2 rounded-lg border block border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300 ease-in text-sm`}
        >
          <option value={""} className="text-black">
            {" "}
            Select Account
          </option>
          <option value={"eth"} className="text-black">
            Eth
          </option>
          <option value={"pkr"} className="text-black">
            Pkr
          </option>
        </select>
      </div>
      <div className="my-4 bg-transparent bg-opacity-30 items-end p-4 rounded-xl border border-gray-600 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-200">
            Your Total Account Balance in Pkr
          </h3>
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <span className="ml-32 inline-block ">Ethereum</span>
              </div>
              <div>
                <p className=" font-light text-sm">......</p>
                <p className=" font-semibold mt-1 flex justify-between">
                  <span>Your Name</span>
                  <span>●●/●●</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-n-6 bg-opacity-30 h-max p-8 rounded-xl border border-n-3">
          <span className="text-n-2 block mb-1">Closing Balance</span>
          <AnimatedCounter
            amount={270000000}
            prefix="Rs. "
            classes="font-semibold text-n-1"
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold text-n-1">Transactions</h3>
          <button>Apply Filter</button>
        </div>
        {/* <div className="grid grid-cols-5 mt-5">
          <div className="col-span-1 bg-white/10">
            <h5 className="text-sm text-gray-200">Transaction</h5>
            <div className="px-2 py-4 flex gap-2">
              <img
                src="/user.jpg"
                width={35}
                className="rounded-full"
                height={35}
                alt=""
              />
              <span>Saad</span>
            </div>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-gray-200">Amount</h5>
            <div className="px-2 py-4 flex gap-2">
              <span className="text-red-500 font-semibold">-$15.00</span>
            </div>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-gray-200">Status</h5>
            <div className="px-2 py-4 flex gap-2">
              <span className="text-gray-600 bg-gray-100 text-xs px-1 py-1 rounded-3xl">
                Processing
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-gray-200">Date</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-gray-200">Txid</h5>
          </div>
        </div> */}
        <TransactionsTable transactions={data} />
      </div>
    </div>
  );
};

export default Page;
