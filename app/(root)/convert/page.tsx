"use client";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/app/context/TransactionContext";
import DoughnutChart from "@/app/components/DoughnutChart";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import CustomInput from "@/app/components/CustomInput";
import { getSession, useSession } from "next-auth/react";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/CustomButton";
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
      const fastSession = await getSession();

      if (isConverted) {
        const resp = await fetch("/api/user/payment/convert", {
          method: "POST",
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
          window.location.reload();
          toast.message(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Error! Please try again");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConverting(false);
    }
  };

  const getData = async (value: string) => {
    if (!value) {
      setEthAmount("");
      setEthToPkr("");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr"
      );
      const ethToPkr = data.ethereum.pkr * parseFloat(value);
      setEthAmount(value);
      setEthToPkr(ethToPkr.toString());
    } catch (error) {
      toast.error("Failed to fetch conversion rate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-12 mx-2 sm:mx-4 md:mx-8 lg:mx-16">
      <Heading
        title="Currency Conversion"
        subtitle="Convert your Eth (Ethereum) to Pakistani Rupees or Pkr to Ethereum"
      />

      <div className="flex flex-col lg:flex-row my-8 md:my-16 lg:my-32 w-full gap-8">
        {/* Conversion Form */}
        <div className="w-full lg:w-3/5">
          <form className="p-4 md:p-5 w-full lg:w-3/4 flex flex-col justify-start items-start">
            <CustomInput
              hint="1"
              name="ethamount"
              type="number"
              handler={(e) => getData(e.target.value)}
              label="Ethereum Amount"
              value={ethAmount}
              classes="mb-4 w-full"
            />

            {!isLoading ? (
              <CustomInput
                hint="681600"
                name="pkr"
                type="text"
                readOnly
                value={ethToPkr}
                label="Pkr Amount"
                classes="w-full"
              />
            ) : (
              <Skeleton className="w-full h-[45px] mt-6" />
            )}

            <Button
              loading={converting}
              disabled={converting || !ethAmount}
              onClick={convert}
              white
              className="mt-6 md:mt-8 w-full rounded-rounded"
            >
              {converting ? "Converting" : "Convert"}
            </Button>
          </form>
        </div>

        {/* Balance Card */}
        {status === "loading" ? (
          <Skeleton className="w-full lg:w-2/5 h-[175px] rounded-xl bg-n-7" />
        ) : (
          <div className="w-full lg:w-2/5 h-max rounded-2xl p-4 bg-n-7">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-28 sm:w-36">
                <DoughnutChart
                  amounts={[
                    session?.user?.balanceEth,
                    session?.user?.balancePkr,
                  ]}
                />
              </div>

              <div className="flex-1">
                <p className="text-gray-500 text-sm">Total Crypto Balance</p>
                <div>
                  <span className="text-lg md:text-xl font-semibold">
                    <AnimatedCounter
                      duration={1}
                      amount={session?.user?.balanceEth}
                      classes="text-white"
                    />{" "}
                    <span className="text-blue-400 text-sm">ETH</span>
                  </span>
                </div>

                <div className="mt-4 sm:mt-8">
                  <p className="text-gray-500 text-sm">Total PKR Balance</p>
                  <div>
                    <span className="text-lg md:text-xl font-semibold">
                      <AnimatedCounter
                        duration={2}
                        amount={session?.user?.balancePkr}
                        classes="text-white"
                      />{" "}
                      <span className="text-blue-400 text-sm">PKR</span>
                    </span>
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
