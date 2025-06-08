"use client";
import AccountBar from "@/app/components/AccountBar";
import Step1 from "@/app/components/signup/Step-1";
import Step2 from "@/app/components/signup/Step-2";
import Step3 from "@/app/components/signup/Step-3";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SingUp = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    cnic: "",
    confirmPassword: "",
    accountType: -1,
    issueDate: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "cnic") {
      if (e.target.value.length === 5 || e.target.value.length === 13)
        e.target.value += "-";
      setUser({ ...user, [e.target.name]: e.target.value });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const signUpHandler = async () => {
    if (
      user.issueDate === "" ||
      user.dob === "" ||
      user.phone === "" ||
      user.cnic === "" ||
      user.email === "" ||
      user.firstName === "" ||
      user.username === ""
    )
      return toast.error("All fields are required!");

    if (user.password !== user.confirmPassword)
      return toast.error("Password not match");
    console.log(user);

    setIsLoading(true);
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success("Account Created! Verify it, code sent on your mail.");
        setActiveStep(3);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") return router.push("/my-account");
  }, []);
  return (
    <section className="py-16 flex-center w-full lg:w-3/5 max-sm:px-6">
      {/* <AuthForm type="sign-up" /> */}
      <AccountBar setter={setActiveStep} activeStep={activeStep} />
      {activeStep === 1 ? (
        <Step1 handler={onChangeHandler} state={user} setter={setActiveStep} />
      ) : activeStep === 2 ? (
        <Step2
          handler={onChangeHandler}
          state={user}
          submitter={signUpHandler}
          loading={isLoading}
        />
      ) : (
        <Step3 state={user} loading={isLoading} />
      )}
    </section>
  );
};

export default SingUp;
