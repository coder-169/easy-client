import React from "react";
import clsx from "clsx";

const Button = ({ children, gradient = false }: { children: React.ReactNode; gradient?: boolean }) => {
  return (
    <button
      className={clsx(
        "relative px-6 py-3 font-semibold rounded-lg transition-all duration-300",
        "text-white bg-gray-900 hover:bg-gray-800",
        gradient &&
          "border-2 border-transparent bg-clip-padding before:absolute before:inset-0 before:-m-1 before:rounded-lg before:bg-gradient-to-r before:from-[#89F9E8] before:via-[#FACB7B] before:to-[#D87CEE] before:z-[-1]"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
