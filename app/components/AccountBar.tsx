import Link from "next/link";
import React from "react";

const AccountBar = ({
  activeStep,
  setter,
}: {
  activeStep: number;
  setter: (step: number) => void;
}) => {
  return (
    <div>
      <h3 className="text-4xl text-n-1 font-bold mb-4 text-center">Sign Up</h3>
      <p className="text-sm font-normal text-n-3 mb-8 text-center">
        {"Already have an account?"}
        <Link
          href={"/sign-in"}
          className="text-blue-400 hover:text-blue-500 transition-all duration-200"
        >
          {" "}
          Sign In
        </Link>
      </p>
      <div className="flex items-center justify-between gap-4 mb-8">
        {/* Step 1 */}
        <div className="flex items-center w-full">
          <span
            onClick={() => setter(1)}
            className={`${
              activeStep > 0
                ? "font-normal bg-white text-black"
                : "text-white font-medium bg-n-6"
            } cursor-pointer rounded-full w-8 h-7 flex items-center justify-center`}
          >
            1
          </span>
          <div
            className={`flex-1 ${
              activeStep > 1 ? "bg-n-1 h-[2px]" : "bg-gray-700 h-[1px]"
            } ml-4`}
          />
        </div>

        {/* Step 2 */}
        <div className="flex items-center w-full">
          <span
            onClick={() => setter(2)}
            className={`${
              activeStep > 1
                ? "font-normal bg-white text-black"
                : "text-white font-medium bg-n-6"
            } cursor-pointer rounded-full w-8 h-7 flex items-center justify-center`}
          >
            2
          </span>
          <div
            className={`flex-1 ${
              activeStep > 2 ? "bg-n-1 h-[2px]" : "bg-gray-700 h-[1px]"
            } ml-4`}
          />
        </div>

        {/* Step 3 */}
        <div className="flex items-center">
          <span
            onClick={() => setter(3)}
            className={`${
              activeStep > 2
                ? "font-normal bg-white text-black"
                : "text-white font-medium bg-n-6"
            } cursor-pointer rounded-full w-8 h-7 flex items-center justify-center`}
          >
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountBar;
