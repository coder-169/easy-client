"use client";
import Link from "next/link";
import React, { useState } from "react";

import { getSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import Button from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ScrollParallax } from "react-just-parallax";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    id_number: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // 2. Define a submit handler.
  const handleSubmit = async () => {
    setIsLoading(true);

    await onSubmitSign();
    setIsLoading(false);
  };
  const onSubmitSign = async () => {
    try {
      signIn("credentials", {
        redirect: false,
        name: user.username,
        ...user,
      })
        .then(async (dt) => {
          if (dt?.ok) {
            toast.success("Logged in Successfully");
            const session = await getSession();
            if (session?.user?.isVerified) {
              router.push("/");
            } else {
              router.push("/sign-up/verify");
            }
          } else {
            toast.error(dt?.error);
          }
        })
        .catch((err) => {
          toast.error(err || "Invalid Credentials");
        });
    } catch (error) {
      toast.error("An error occurred while signing in. Please try again.");
    } finally {
    }
  };
  const [type, setType] = useState("password");

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
          <h3 className="text-2xl font-bold text">Sign In</h3>
          <CustomInput
            type="text"
            hint={"Enter your email or Username"}
            // label={"Login Id"}
            name={"username"}
            value={user.username}
            handler={onChangeHandler}
          />
          <div className="relative">
            <CustomInput
              type={type}
              hint={"********"}
              // label={"Password"}
              value={user.password}
              handler={onChangeHandler}
              name={"password"}
            />
            {user.password.length > 0 ? (
              type === "password" ? (
                <button
                  type="button"
                  className="absolute top-5 right-4"
                  onClick={() => setType("text")}
                >
                  <FaEye className="text-sm" />
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute top-5 right-4"
                  onClick={() => setType("password")}
                >
                  <FaEyeSlash className="text-sm" />
                </button>
              )
            ) : (
              ""
            )}
          </div>
          <Link
            href={"/forgot-password"}
            className="block ml-auto w-max text-xs text-color-1 !mt-2"
          >
            Forgot Password?
          </Link>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              disabled={isLoading || !user.username || !user.password}
              white
              className="w-full"
            >
              Sign in
            </Button>
          </div>
          <div className="mt-2 flex justify-center gap-1">
            <p className="text-sm font-normal text-n-3 ">
              {"Don't have an account?"}
              <Link
                href={"/sign-up"}
                className="text-blue-400 hover:text-blue-500 transition-all duration-200"
              >
                {" "}
                Sign Up
              </Link>
            </p>
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

export default SignIn;
