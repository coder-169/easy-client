"use client";
// import { Loader } from "@/app/components";

import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/app/context/TransactionContext";
import DoughnutChart from "@/app/components/DoughnutChart";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import CustomInput from "@/app/components/CustomInput";
import { Loader } from "@/app/components";
import { getSession, useSession } from "next-auth/react";
import { BiLoader } from "react-icons/bi";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/CustomButton";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ethAmount, setEthAmount] = useState("");
  const [pkrAmount, setPkrAmount] = useState("");
  const [ethToPkr, setEthToPkr] = useState(0);
  const { data: session, status } = useSession();
  console.log(session);
  const [amounts, setAmounts] = useState([0, 0]);
  const getData = async () => {
    setIsLoading(true);
    const mysession = await getSession();
    const user = mysession?.user;
    console.log(user);
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const eth = data.ethereum.pkr * user.balanceEth;
        const pkr = user.balancePkr;
        const total = eth + user.balancePkr;
        console.log(pkr, eth, total);
        setEthToPkr(data.ethereum.pkr);
        setAmounts([(eth / total) * 100, (pkr / total) * 100]);
      });
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="my-8 mx-16">
      <Heading
        title="Currency Conversion"
        subtitle="Convert your Eth (Ethereum) to Pakistani Rupees or Pkr to Ethereum"
      />
      <div className="flex my-32 w-full mx-auto">
        <div className="w-3/5">
          <form
            action=""
            className="p-5 w-3/4 flex flex-col justify-start items-start"
          >
            <CustomInput
              hint="1"
              name="to"
              type="text"
              handler={(e) => {
                setEthAmount(e.target.value);
                setPkrAmount("");
              }}
              label="Ethereum Amount"
              value={
                parseInt(pkrAmount) > 0
                  ? (parseInt(pkrAmount) / ethToPkr).toString()
                  : ethAmount
              }
              classes="mb-4"
            />
            <CustomInput
              hint="681600"
              name="pkr"
              type="text"
              handler={(e) => {
                setPkrAmount(e.target.value);
                setEthAmount("");
              }}
              value={
                parseInt(ethAmount) > 0
                  ? (parseInt(ethAmount) * ethToPkr).toString()
                  : pkrAmount
              }
              label="Pkr Amount"
            />
            <Button white className="mt-8 w-full rounded-rounded">
              {isLoading ? (
                <span className="flex items-center gap-4">
                  Converting <Loader2 className="animate-spin size-4" />
                </span>
              ) : (
                "Convert"
              )}
            </Button>
          </form>
        </div>

        {status === "loading" ? (
          <Skeleton className="w-[400px] h-[175px] rounded-xl bg-n-7" />
        ) : (
          <div className="w-2/5 h-max rounded-2xl p-4 bg-n-7">
            <div className="flex justify-between items-center">
              <div className="w-36">
                <DoughnutChart amounts={amounts} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Crypto Balance</p>
                <div>
                  <span className="text-xl font-semibold">
                    <AnimatedCounter
                      duration={1}
                      amount={session?.user.balanceEth}
                    />{" "}
                    <span className="text-blue-400 text-sm">ETH</span>
                  </span>{" "}
                </div>
                <div className="mt-8">
                  <p className="text-gray-500 text-sm">Total PKR Balance</p>
                  <div>
                    <span className="text-xl font-semibold">
                      <AnimatedCounter
                        duration={2}
                        amount={session?.user.balancePkr}
                      />{" "}
                      <span className="text-blue-400 text-sm">PKR</span>
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

// 681600 = eth  = 68100/284
