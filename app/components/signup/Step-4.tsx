import React, { useState } from "react";
import Button from "../CustomButton";
import Input from "../CustomInput";
import toast from "react-hot-toast";

const Step4 = ({
  loading,
  handler,
  submitter,
  state,
  setter,
}: {
  state: { email: string; phone: string };
  submitter: () => void;
  setter: (step: number) => void;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}) => {
  const sendEmail = async () => {
    try {
      // Sending Code
      submitter();
      const resp = await fetch("/api/auth/send-email", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        setter(5);
        toast.success("Email sent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold mb-8">Contact Details</h3>
      <div className="mt-4">
        <Input
          type="email"
          hint={"Enter your email"}
          label={"Email"}
          value={state.email}
          handler={handler}
          name={"email"}
          classes="!w-1/2 mb-4"
        />
        <Input
          type="text"
          hint={"+923253275624"}
          label={"Phone"}
          value={state.phone}
          handler={handler}
          name={"phone"}
          classes="!w-1/3"
        />
      </div>
      <Button
        disabled={loading}
        className="!w-1/2 !block !mx-auto !mt-8 !py-4"
        onClick={() => sendEmail()}
        white
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Step4;
