import React, { useState } from "react";
import Button from "../CustomButton";
import Input from "../CustomInput";
import toast from "react-hot-toast";

const Step5 = ({
  loading,
  handler,
  submitter,
  state,
}: {
  state: { email: string; phone: string };
  submitter: () => void;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}) => {
  const [code, setCode] = useState("");
  const sendEmail = async () => {
    try {
      // Sending Code
      const resp = await fetch("/api/auth/send-email", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success("Email Resent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };
  const verifyAccount = async () => {
    try {
      // Sending Code
      const resp = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          code
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success("Account verified successfully!");
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
      <h3 className="text-2xl font-bold mb-8">Account Verification</h3>
      <div className="mt-4">
        <Input
          type="email"
          hint={"Enter verification code"}
          label={"Email"}
          value={state.email}
          handler={(e) => setCode(e.target.value)}
          name={"email"}
          classes="!w-1/2 mb-4"
        />
      </div>
      <button onClick={sendEmail} className="text-xs small text-n-2">Resend</button>
      <Button
        disabled={loading}
        className="!w-1/2 !block !mx-auto !mt-8 !py-4"
        onClick={verifyAccount}
        white
      >
        Verify
      </Button>
    </div>
  );
};

export default Step5;
