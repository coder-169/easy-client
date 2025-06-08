import React from "react";
import Button from "../CustomButton";
import Input from "../CustomInput";

const Step3 = ({
  setter,
  activeStep,
  handler,
  state,
}: {
  state: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    dob: string;
  };
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setter: (step: number) => void;
  activeStep: number;
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold mb-8">Personal Details</h3>
      <div className="mt-4">
        <div className="flex gap-2 justify-between mt-4">
          <Input
            type="text"
            hint={"John"}
            label={"First Name"}
            name={"firstName"}
            classes="w-1/2"
            value={state.firstName}
            handler={handler}
          />
          <Input
            type="text"
            hint={"Doe"}
            label={"Last Name"}
            name={"lastName"}
            classes="w-1/2"
            value={state.lastName}
            handler={handler}
          />
        </div>
        <div className="flex gap-2 justify-between mt-4">
          <Input
            type="text"
            hint={"Johnboe12"}
            label={"Username"}
            value={state.username}
            handler={handler}
            name={"username"}
          />
          <Input
            type="date"
            hint={"YYYY-MM-DD"}
            label={"Date of Birth"}
            value={state.dob}
            handler={handler}
            name={"dob"}
            classes="w-1/2"
          />
        </div>
        <div className="flex gap-2 justify-between mt-4">
          <Input
            type="password"
            hint={"********"}
            label={"Password"}
            value={state.password}
            handler={handler}
            name={"password"}
          />
          <Input
            type="password"
            hint={"********"}
            label={"Confirm Password"}
            value={state.confirmPassword}
            handler={handler}
            name={"confirmPassword"}
          />
        </div>
      </div>
     
      <Button
        disabled={
          !state.username ||
          !state.firstName ||
          !state.dob ||
          !state.password ||
          !state.confirmPassword ||
          !state.lastName
        }
        className="!w-1/2 !block !mx-auto !mt-8 !py-4"
        onClick={() => setter(4)}
        white
      >
        Next
      </Button>
    </div>
  );
};

export default Step3;
