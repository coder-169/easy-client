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
      let value = e.target.value.replace(/\D/g, ""); // Remove all non-digits

      // Auto-format as user types
      if (value.length > 13) {
        value = value.substring(0, 13); // Don't allow more than 13 digits
      }

      // Format with hyphens
      if (value.length > 5) {
        value = `${value.substring(0, 5)}-${value.substring(5)}`;
      }
      if (value.length > 13) {
        value = `${value.substring(0, 13)}-${value.substring(13)}`;
      }

      setUser({ ...user, [e.target.name]: value });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const validateInputs = () => {
    // Check required fields
    if (!user.firstName) return toast.error("First name is required");
    if (!user.username) return toast.error("Username is required");
    if (!user.email) return toast.error("Email is required");
    if (!user.dob) return toast.error("Date of birth is required");
    if (!user.cnic) return toast.error("CNIC is required");
    if (!user.phone) return toast.error("Phone number is required");
    if (!user.issueDate) return toast.error("ID issue date is required");

    // Format validations
    if (user.email && !/^\S+@\S+\.\S+$/.test(user.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (user.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(user.cnic)) {
      toast.error("CNIC must be in format 12345-1234567-1");
      return false;
    }

    if (user.phone && !/^\d{11}$/.test(user.phone)) {
      toast.error("Phone must be 11 digits");
      return false;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Password not match");
      return false;
    }

    const today = new Date();
    const dob = new Date(user.dob);
    const issueDate = new Date(user.issueDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // Check if under 18
    if (age < 18) {
      toast.error("You must be at least 18 years old");
      return false 
    }
    if (issueDate > today) {
      toast.error("Issue date cannot be in the future");
      return false 
    }

    // Calculate expiration date (10 years from issue)
    const expirationDate = new Date(issueDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);

    // Check if already expired
    if (expirationDate < today) {
      toast.error("Card has already expired!");
      return false 
    }
    return true;
  };
  const signUpHandler = async () => {
    const validated = validateInputs();
    if (!validated) return;
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
    if (status === "authenticated") return router.push("/profile");
  }, [router, status]);
  return (
    <section className="py-16 flex-center w-full px-4 md:px-16 lg:px-32 lg:w-3/5 max-sm:px-6">
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
