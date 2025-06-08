import React from "react";

const Input = ({
  hint,
  classes,
  name,
  type,
  value,
  step,
  handleChange,
}: InputProps) => (
  <input
    className={`my-2 w-full rounded-md p-2 outline-none bg-transparent  border-none text-sm white-glassmorphism ${classes}`}
    placeholder={hint}
    type={type}
    name={name}
    id={name}
    step={step}
    value={value}
    onChange={handleChange}
    autoComplete="off"
  />
);

export default Input;
