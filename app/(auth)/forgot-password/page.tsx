"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

import { toast } from "sonner";
import Logo from "@/app/components/Logo";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import { ScrollParallax } from "react-just-parallax";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
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
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
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
      const resp = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          code,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success("Code verified successfully!");
        setIsVerified(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordUpdate = async () => {
    try {
      if (passwords.confirmPassword !== passwords.newPassword)
        return toast.error("Both passwords should match!");
      if (!email) {
        setCodeSent(false);
        setCode("");
        setIsVerified(false);
        return toast.error("Re enter email!");
      }
      setIsLoading(true);
      const resp = await fetch("/api/user/password", {
        method: "POST",
        body: JSON.stringify({ email, ...passwords }),
      });
      const data = await resp.json();
      console.log(resp);
      if (data.success) {
        router.push("/sign-in");
        toast.success("Password updated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [type, setType] = useState("password");
  return (
    <ScrollParallax isAbsolutelyPositioned>
      <section className="h-screen z-50 relative w-full px-32 flex flex-row items-center justify-center">
        <form
          onSubmit={onSubmitSign}
          className="mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3 space-y-6 h-max"
        >
          <Link
            href={"/"}
            className="flex cursor-pointer items-center gap-1 px-4"
          >
            <Logo />
          </Link>
          <h3 className="text-3xl font-bold text">Forgot Password</h3>
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
                type="email"
                hint={"Enter your email"}
                // label={"Login Id"}
                name={"username"}
                value={email}
                handler={(e) => setEmail(e.target.value)}
              />
            )
          )}
          {isVerified && codeSent && (
            <div className="relative">
              {passwords.newPassword.length > 0 && (
                <button
                  onClick={() =>
                    setType(type === "password" ? "text" : "password")
                  }
                  className="absolute top-[20px] right-4"
                >
                  {type === "text" ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
              <CustomInput
                type={type}
                hint={"New Password"}
                // label={"Login Id"}
                name={"newPassword"}
                value={passwords.newPassword}
                handler={onChangeHandler}
              />
              <CustomInput
                type={type}
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
              <button
                onClick={handleEmailCode}
                className="block w-max text-xs text-color-1 !mt-2"
              >
                Resend code?
              </button>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {isVerified ? (
              <Button
                onClick={handlePasswordUpdate}
                disabled={isLoading}
                // type="submit"
                loading={isLoading}
                className="relative disabled:opacity-70 disabled:pointer-events-auto disabled:cursor-not-allowed"
                // text={"Sign In"}
                white
              >
                {!isLoading ? "Update" : "Updating"}
              </Button>
            ) : (
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
            )}
          </div>
          <p className="text-center text-sm">
            Remember password?{" "}
            <Link href={"/sign-in"} className="text-color-1">
              Sign In
            </Link>
          </p>
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
