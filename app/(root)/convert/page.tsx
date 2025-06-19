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
import axios from "axios";
import { toast } from "sonner";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ethAmount, setEthAmount] = useState("");
  const [ethToPkr, setEthToPkr] = useState("");
  const { data: session, status } = useSession();
  const [converting, setConverting] = useState(false);
  const { convertToPkr } = useContext(TransactionContext);

  const convert = async () => {
    try {
      setConverting(true);

      const isConverted = await convertToPkr(ethAmount);
      console.log(isConverted);
      const fastSession = await getSession();
      if (isConverted) {
        const resp = await fetch("/api/user/payment/convert", {
          headers: {
            id: fastSession?.user?._id,
          },
          body: JSON.stringify({
            amount: ethAmount,
            pkr: ethToPkr,
          }),
        });
        const data = await resp.json();
        if (data.success) {
          toast.message(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("error! try again");
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setConverting(false);
    }
  };
  const getData = async (value: string) => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr"
    );
    const ethToPkr = data.ethereum.pkr * parseFloat(value);
    setEthAmount(value);
    setEthToPkr(ethToPkr.toString());
    setIsLoading(false);
  };
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
              name="ethamount"
              type="text"
              handler={(e) => getData(e.target.value)}
              label="Ethereum Amount"
              value={ethAmount}
              classes="mb-4"
            />
            {!isLoading ? (
              <CustomInput
                hint="681600"
                name="pkr"
                type="text"
                readOnly
                value={ethToPkr}
                label="Pkr Amount"
              />
            ) : (
              <Skeleton className="w-[448px] h-[45px] mt-6" />
            )}
            <Button
              loading={converting}
              disabled={converting}
              onClick={convert}
              white
              className="mt-8 w-full rounded-rounded"
            >
              {converting ? "Converting" : "Convert"}
            </Button>
          </form>
        </div>

        {status === "loading" ? (
          <Skeleton className="w-[400px] h-[175px] rounded-xl bg-n-7" />
        ) : (
          <div className="w-2/5 h-max rounded-2xl p-4 bg-n-7">
            <div className="flex justify-between items-center">
              <div className="w-36">
                <DoughnutChart
                  amounts={[
                    session?.user?.balanceEth,
                    session?.user?.balancePkr,
                  ]}
                />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Crypto Balance</p>
                <div>
                  <span className="text-xl font-semibold">
                    <AnimatedCounter
                      duration={1}
                      amount={session?.user?.balanceEth}
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
                        amount={session?.user?.balancePkr}
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
