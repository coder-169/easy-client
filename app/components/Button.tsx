import React from "react";
import Loader from "./Loader";
import { BiLoader } from "react-icons/bi";

const Button = ({
  disabled,
  text,
  isLoading,
  classes,
  onClicker,
  type = "button",
}: {
  isLoading?: boolean;
  disabled?: boolean;
  text: string;
  classes?: string;
  onClicker?: () => void;
  type?: "submit" | "reset" | "button";
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      type={type}
      onClick={onClicker}
      className={`disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] text-white font-medium  ${classes}`}
    >
      {" "}
      {isLoading ? (
        <span className="flex items-center justify-between">
          <span></span>
          Signing in...
          <BiLoader className="animate-spin" />
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
