import React, { useState } from "react";
import Button from "../CustomButton";
import Input from "../CustomInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Step3 = ({ state }: { state: { email: string; phone: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    if (code.length !== 6) {
      return toast.error("Code must be 6 digits long");
    }
    setLoading(true);
    try {
      // Sending Code
      const resp = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          code,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        router.push("/sign-in");
        toast.success("Account verified successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold mb-8">Account Verification</h3>
      <div className="mt-4">
        <Input
          type="text"
          hint={"Enter verification code"}
          label={"Verification Code"}
          value={code}
          handler={(e) => {
            if (e.target.value.length <= 6) {
              setCode(e.target.value);
            }
          }}
          name={"text"}
          classes="!w-1/2 mb-4"
        />
      </div>
      <button onClick={sendEmail} className="text-xs small text-n-2">
        Resend
      </button>
      <Button
        loading={loading}
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

export default Step3;
