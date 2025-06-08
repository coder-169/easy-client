import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {" "}
      <Image
        src={"/logo-light.png"}
        height={34}
        width={250}
        alt="FYP Logo"
        className="invert"
      />{" "}
    </div>
  );
};

export default Logo;
