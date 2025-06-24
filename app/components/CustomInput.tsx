import React from "react";

const CustomInput = ({
  hint,
  classes,
  name,
  type,
  value,
  step,
  handler,
  readOnly,
  label,
}: InputProps) => (
  <div className="inline-block w-full">
    <label
      htmlFor={name}
      className="mb-1 text-xs md:text-sm text-n-2 block font-semibold"
    >
      {label}
    </label>
    <input
      className={`bg-transparent bg-opacity-30 w-full text-n-1 p-3 font-semibold rounded-lg border block border-n-6   focus:border-n-4 !outline-none  !ring-0 transition-all  duration-300 ease-in text-sm ${classes}`}
      autoComplete="off"
      placeholder={hint}
      type={type}
      name={name}
      id={name}
      step={step}
      value={value}
      onChange={handler}
      readOnly={readOnly}
    />
  </div>
);

export default CustomInput;
