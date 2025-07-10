"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

import { toast } from "sonner";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import { ScrollParallax } from "react-just-parallax";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  // 2. Define a submit handler.
  const onSubmitSign = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCode = async () => {
    const session = await getSession();
    if (status === "unauthenticated") {
      toast.error("You must be logged in to perform this action.");
      return;
    }
    setIsLoading(true);
    try {
      // Sending Code
      const resp = await fetch("/api/auth/send-email", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        setCodeSent(true);
        toast.success("Email sent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCodeVerification = async () => {
    setIsLoading(true);
    if (status === "unauthenticated") {
      toast.error("You must be logged in to perform this action.");
      return;
    }
    const session = await getSession();

    try {
      // Sending Code
      const resp = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          code,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success("Code verified successfully!");
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  return (
    <ScrollParallax isAbsolutelyPositioned>
      <section className="h-screen z-50 relative w-full px-4 md:px-16 lg:px-32 flex flex-row items-center justify-center">
        <form
          onSubmit={onSubmitSign}
          className="mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3 space-y-6 h-max"
        >
          <Link href={"/"} className="flex cursor-pointer items-center gap-1">
            {" "}
            <h3 className="text-3xl text-n-1 font-bold">
              Easy
              <span className="text-color-1">Krypt</span>
            </h3>
          </Link>
          <h3 className="text-3xl font-bold text">Verify Account</h3>
          <CustomInput
            type="text"
            hint={"● ● ● ● ● ●"}
            name={"code"}
            value={code}
            classes="text-center "
            handler={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length > 6) return;
              setCode(e.target.value);
            }}
          />

          <div className="flex justify-between">
            <button
              onClick={handleEmailCode}
              className="block w-max text-xs text-color-1 !mt-2"
            >
              Resend code?
            </button>
          </div>
          <Button
            onClick={codeSent ? handleCodeVerification : handleEmailCode}
            disabled={isLoading}
            // type="submit"
            loading={isLoading}
            className="relative disabled:opacity-70 disabled:pointer-events-auto disabled:cursor-not-allowed"
            // text={"Sign In"}
            white
          >
            {codeSent
              ? !isLoading
                ? "Verify"
                : "Verifying"
              : !isLoading
              ? "Get code"
              : "Getting code"}
          </Button>
        </form>
      </section>
      <BackgroundCircles />
    </ScrollParallax>
  );
};

const BackgroundCircles = () => {
  return (
    <>
      <div>
        <div className="z-40 absolute top-1/2 left-1/2 w-[22rem] lg:w-[45rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2">
          <div className="z-40 absolute top-1/2 left-1/2 w-[16rem] lg:w-[32rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="z-40 absolute top-1/2 left-1/2 w-[12rem] lg:w-[21rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>{" "}
      </div>
      <div className="absolute top-[4.4rem] left-16 w-16 h-16 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[12.6rem] right-16 w-32 h-32 animate-pulse  bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[26.8rem] animate-pulse left-12 w-48 h-48 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full"></div>
    </>
  );
};

export default Page;
