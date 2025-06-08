import React from "react";
import Button from "../CustomButton";
import Input from "../CustomInput";

const Step2 = ({
  setter,
  state,
  handler,
}: {
  setter: (step: number) => void;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: { issueDate: string; cnic: string; email: string; phone: string };
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl text-n-1 font-bold mb-8">Cnic and Contact Details</h3>
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
      <div className="my-4 flex gap-8 justify-between">
        <Input
          type="email"
          hint={"Enter your email"}
          label={"Email"}
          value={state.email}
          handler={handler}
          name={"email"}
          classes="w-1/2"
        />
        <Input
          type="text"
          hint={"+923253275624"}
          label={"Phone"}
          value={state.phone}
          handler={handler}
          name={"phone"}
          classes="w-1/2"
        />
      </div>
      <Button
        disabled={
          !state.phone || !state.email || !state.issueDate || !state.cnic
        }
        className="!w-1/2 !block !mx-auto !mt-8 !py-4"
        onClick={() => setter(2)}
        white
      >
        Next
      </Button>
    </div>
  );
};

export default Step2;
