import React from "react";
import Button from "../CustomButton";

const Step1 = ({
  setter,
  state,
  stateSetter,
}: {
  setter: (step: number) => void;
  stateSetter: ({}) => void;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: { accountType: number };
  activeStep: number;
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold mb-8 text-n-1 mt-12">Account Type</h3>
      <div className="flex gap-8 mt-4">
        <button
          onClick={() => stateSetter({ ...state, accountType: 0 })}
          className={`font-medium bg-transparent bg-opacity-30 w-full text-n-1 px-3 py-8 rounded-xl border-2 block ${
            state.accountType === 0 ? "border-n-4" : "border-n-6"
          } focus:outline-none transition-all duration-300 ease-in text-sm`}
        >
          Current Account
        </button>
        <button
          onClick={() => stateSetter({ ...state, accountType: 1 })}
          className={`font-medium bg-transparent bg-opacity-30 w-full text-n-1 px-3 py-8 rounded-xl border-2 block focus:outline-none ${
            state.accountType === 1 ? "border-n-4" : "border-n-6"
          } transition-all duration-300 ease-in text-sm`}
        >
          Saving Account
        </button>
      </div>

      <Button
        disabled={state.accountType === -1}
        className="!w-1/2 !block !mx-auto !mt-8 !py-4"
        onClick={() => setter(2)}
        white
      >
        Next
      </Button>
    </div>
  );
};

export default Step1;
