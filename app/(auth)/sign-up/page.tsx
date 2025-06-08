"use client";
import AccountBar from "@/app/components/AccountBar";
import Step1 from "@/app/components/signup/Step-1";
import Step2 from "@/app/components/signup/Step-2";
import Step3 from "@/app/components/signup/Step-3";
import Step4 from "@/app/components/signup/Step-4";
import Step5 from "@/app/components/signup/Step-5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [cnicFront, setCnicFront] = useState<string | null>(null);
  const [cnicBack, setCnicBack] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      console.log(imageUrl);
      if (e.target.name === "cnicFront") setCnicFront(imageUrl);
      else setCnicBack(imageUrl);
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "cnic") {
      if (e.target.value.length === 5 || e.target.value.length === 13)
        e.target.value += "-";
      setUser({ ...user, [e.target.name]: e.target.value });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const uploadImage = async (images: string[]) => {
    console.log("uploading");
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const e = images[i];
      const resp = await fetch(e);
      const blob = await resp.blob();
      console.log(blob);
      // Convert blob to File object
      const file = new File([blob], "image.jpeg", { type: blob.type });
      const data = new FormData();
      console.log(file);
      data.append("file", file);
      data.append("upload_preset", "easykcrypt");
      data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env
          .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      console.log(res);
      urls.push(res.secure_url);
    }
    return urls;
  };
  const signUpHandler = async () => {
    if (
      user.issueDate === "" ||
      user.dob === "" ||
      user.phone === "" ||
      user.cnic === "" ||
      user.email === "" ||
      user.firstName === "" ||
      user.lastName === "" ||
      user.username === ""
    )
      return toast.error("All fields are required!");
    setIsLoading(true);
    const urls = await uploadImage([cnicFront, cnicBack]);
    console.log(urls);
    if (!urls.length) return toast.error("Images not upload");
    if (user.password !== user.confirmPassword)
      return toast.error("Password not match");
    console.log(user);
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          cnicFront: urls[0],
          cnicBack: urls[1],
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success("Account Created! Your account will be verified soon.");
        router.push("/");
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
        <Step1
          handler={onChangeHandler}
          state={user}
          stateSetter={setUser}
          activeStep={activeStep}
          setter={setActiveStep}
        />
      ) : activeStep === 2 ? (
        <Step2
          handler={onChangeHandler}
          state={user}
          activeStep={activeStep}
          setter={setActiveStep}
          imageHandler={handleImageChange}
          front={cnicFront || ""}
          back={cnicBack || ""}
        />
      ) : activeStep === 3 ? (
        <Step3
          handler={onChangeHandler}
          state={user}
          activeStep={activeStep}
          setter={setActiveStep}
        />
      ) : activeStep === 4 ? (
        <Step4
          handler={onChangeHandler}
          state={user}
          submitter={signUpHandler}
          loading={isLoading}
          setter={setActiveStep}
        />
      ) : (
        <Step5
          handler={onChangeHandler}
          state={user}
          submitter={signUpHandler}
          loading={isLoading}
        />
      )}
    </section>
  );
};

export default SingUp;
