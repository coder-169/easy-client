"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

import { toast } from "sonner";
import Logo from "@/app/components/Logo";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import { ScrollParallax } from "react-just-parallax";
import { Loader2Icon } from "lucide-react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
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
    setIsLoading(true);
    try {
      // Sending Code
      const resp = await fetch("/api/auth/send-email", {
        method: "POST",
        body: JSON.stringify({
          email,
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
    try {
      // Sending Code
      setIsVerified(true);
      toast.success("Code verified successfully!");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordUpdate = async () => {
    setIsLoading(true);
    try {
      // Sending Code
      setIsVerified(true);
      toast.success("Password updated successfully!");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  return (
    <ScrollParallax isAbsolutelyPositioned>
      <section className="h-screen z-50 relative w-full px-32 flex flex-row items-center justify-center">
        <form onSubmit={onSubmitSign} className="mx-auto w-1/4 space-y-6 h-max">
          <Link
            href={"/"}
            className="flex cursor-pointer items-center gap-1 px-4"
          >
            <Logo />
          </Link>
          <h3 className="text-3xl font-bold text">Forgot Password</h3>
          {}
          {codeSent && !isVerified ? (
            <CustomInput
              type="text"
              hint={"● ● ● ● ● ●"}
              name={"code"}
              value={code}
              classes="text-center "
              handler={(e) => {
                if (e.target.value.length > 6) return;
                setCode(e.target.value);
              }}
            />
          ) : (
            !isVerified && (
              <CustomInput
                type="text"
                hint={"Enter your email"}
                // label={"Login Id"}
                name={"username"}
                value={email}
                handler={(e) => setEmail(e.target.value)}
              />
            )
          )}
          {isVerified && codeSent && (
            <div>
              <CustomInput
                type="password"
                hint={"New Password"}
                // label={"Login Id"}
                name={"newPassword"}
                value={passwords.newPassword}
                handler={onChangeHandler}
              />
              <CustomInput
                type="password"
                hint={"Confirm Password"}
                // label={"Login Id"}
                name={"confirmPassword"}
                value={passwords.confirmPassword}
                handler={onChangeHandler}
              />
            </div>
          )}
          {codeSent && !isVerified && (
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setCodeSent(false);
                }}
                className="block w-max text-xs text-n-1 !mt-2"
              >
                Incorrect email?
              </button>
              <Link
                href={"/forgot-password"}
                className="block w-max text-xs text-color-1 !mt-2"
              >
                Resend code?
              </Link>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {isVerified ? (
              <Button
                onClick={handlePasswordUpdate}
                disabled={isLoading}
                // type="submit"
                className="relative disabled:opacity-70 disabled:pointer-events-auto disabled:cursor-not-allowed"
                // text={"Sign In"}
                white
              >
                {!isLoading ? (
                  <p className="flex justify-between text-center">
                    <span>Update</span>
                  </p>
                ) : (
                  <p className="flex justify-between">
                    <span></span>
                    <span>Updating</span>
                    <Loader2Icon className="animate-spin text-black" />
                  </p>
                )}
              </Button>
            ) : (
              <Button
                onClick={codeSent ? handleCodeVerification : handleEmailCode}
                disabled={isLoading}
                // type="submit"
                className="relative disabled:opacity-70 disabled:pointer-events-auto disabled:cursor-not-allowed"
                // text={"Sign In"}
                white
              >
                {codeSent ? (
                  !isLoading ? (
                    <p className="flex justify-between text-center">
                      <span>Verify</span>
                    </p>
                  ) : (
                    <p className="flex justify-between">
                      <span></span>
                      <span>Verifying</span>
                      <Loader2Icon className="animate-spin text-black" />
                    </p>
                  )
                ) : !isLoading ? (
                  <p className="flex justify-between text-center">
                    <span>Get Code</span>
                  </p>
                ) : (
                  <p className="">
                    <span>Getting Code</span>
                    <Loader2Icon className="absolute top-2 right-2 animate-spin text-black" />
                  </p>
                )}
              </Button>
            )}
          </div>
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
        <div className="z-40 absolute top-1/2 left-1/2 w-[45rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2">
          <div className="z-40 absolute top-1/2 left-1/2 w-[32rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="z-40 absolute top-1/2 left-1/2 w-[21rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>{" "}
      </div>
      <div className="absolute top-[4.4rem] left-16 w-16 h-16 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[12.6rem] right-16 w-32 h-32 animate-pulse  bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[26.8rem] animate-pulse left-12 w-48 h-48 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full"></div>
    </>
  );
};

export default Page;
