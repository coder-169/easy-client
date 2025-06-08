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
      <h3 className="text-4xl text-n-1 font-bold mb-12 text-center">Sign Up</h3>
      <div className="flex items-center justify-between gap-4 mb-8">
        {/* Account Type */}
        <div className="w-1/3 flex items-center gap-2">
          <span
            onClick={() => setter(1)}
            className={`${activeStep > 0 ? "font-normal bg-white text-black" : "text-white font-medium  bg-n-6"} cursor-pointer  rounded-full w-8 h-7 flex items-center justify-center`}
          >
            1
          </span>
          <div
            className={`w-full ${activeStep > 1 ? "bg-n-1 h-[2px]" : "bg-gray-700 h-[1px]"
              } rounded-full`}
          />
        </div>
        {/* Cnic Details */}
        <div className="w-1/3 flex items-center gap-4">
          <span
            onClick={() => setter(2)}
            className={`${activeStep > 1 ? "font-normal bg-white text-black" : "text-white font-medium  bg-n-6"} cursor-pointer  rounded-full w-8 h-7 flex items-center justify-center`}
          >
            2
          </span>
          <div
            className={`w-full ${activeStep > 2 ? "bg-n-1 h-[2px]" : "bg-gray-700 h-[1px]"
              } rounded-full`}
          />
        </div>
        {/* Personal Details */}
        <div className="w-1/3 flex items-center gap-4">
          <span
            onClick={() => setter(3)}
            className={`${activeStep > 2 ? "font-normal bg-white text-black" : "text-white font-medium  bg-n-6"} cursor-pointer  rounded-full w-8 h-7 flex items-center justify-center`}
          >
            3
          </span>
          <div
            className={`w-full ${activeStep > 3 ? "bg-n-1 h-[2px]" : "bg-gray-700 h-[1px]"
              } rounded-full`}
          />
        </div>
        <div className="w-1/3 flex items-center gap-4">
          <span
            onClick={() => setter(4)}
            className={`${activeStep > 3 ? "font-normal bg-white text-black" : "text-white font-medium  bg-n-6"} cursor-pointer  rounded-full w-8 h-7 flex items-center justify-center`}
          >
            4
          </span>
          <div
            className={`w-full ${activeStep > 4 ? "bg-n-1 h-[2px]" : "bg-gray-700 h-[1px]"
              } rounded-full`}
          />
        </div>
        {/*  Extras */}
        <div className="w-max flex items-center gap-4">
          <span
            onClick={() => setter(5)}
            className={`${activeStep > 4 ? "font-normal bg-white text-black" : "text-white font-medium  bg-n-6"} cursor-pointer  rounded-full w-7 h-7 flex items-center justify-center`}
          >
            5
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountBar;
