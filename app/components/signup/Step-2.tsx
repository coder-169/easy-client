import React from "react";
import Button from "../CustomButton";
import Input from "../CustomInput";
import { FaImage } from "react-icons/fa";
import Image from "next/image";

const Step2 = ({
  setter,
  activeStep,
  state,
  handler,
  imageHandler,
  front,
  back,
}: {
  front: string;
  back: string;
  setter: (step: number) => void;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: { issueDate: string; cnic: string };
  activeStep: number;
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl text-n-1 font-bold mb-8">Cnic/Snic Details</h3>
      <div className="flex gap-8 justify-between">
        <Input
          type="date"
          hint={"YYYY-MM-DD"}
          label={"Issue Date"}
          value={state.issueDate}
          handler={handler}
          name={"issueDate"}
          classes="w-1/2"
        />
        <Input
          type="text"
          hint={"45303-1234123-4"}
          label={"Id Number"}
          value={state.cnic}
          handler={handler}
          name={"cnic"}
          classes="w-1/2"
        />
      </div>
      <div className="flex gap-8 justify-between mt-8">
        {/* <button>

        </button> */}
        {front ? (
          <Image
            src={front}
            width={250}
            height={100}
            alt="Cnic Front"
            className="w-1/2 rounded-xl"
          />
        ) : (
          <label
            htmlFor="cnicFront"
            className={`bg-transparent bg-opacity-30 w-full text-gray-100 px-3 py-16 rounded-xl border border-n-6 focus:outline-none focus:border-n-4 transition-all duration-300 ease-in text-sm flex items-center justify-center flex-col gap-4`}
          >
            <FaImage className="text-4xl" />
            <span className="text-sm text-gray-400">
              CNIC Front (jpeg,png or jpg)
            </span>
          </label>
        )}

        <input
          type="file"
          hidden
          accept="image/*"
          id="cnicFront"
          onChange={imageHandler}
          name="cnicFront"
        />
        {back ? (
          <Image
            src={back}
            width={250}
            height={100}
            alt="Cnic Front"
            className="w-1/2 rounded-xl"
          />
        ) : (
          <label
            htmlFor="cnicBack"
            className={`bg-transparent bg-opacity-30 w-full text-gray-100 px-3 py-16 rounded-xl border border-n-6 focus:outline-none focus:border-n-4 transition-all duration-300 ease-in text-sm flex items-center justify-center flex-col gap-4`}
          >
            <FaImage className="text-4xl" />
            <span className="text-sm text-gray-400">
              CNIC Back (jpeg,png or jpg)
            </span>
          </label>
        )}

        <input
          type="file"
          hidden
          accept="image/*"
          id="cnicBack"
          onChange={imageHandler}
          name="cnicBack"
        />
      </div>
      <Button
        disabled={!back || !front || !state.issueDate || !state.cnic}
        className="!w-1/2 !block !mx-auto !mt-8 !py-4"
        onClick={() => setter(3)}
        white
      >
        Next
      </Button>
    </div>
  );
};

export default Step2;
