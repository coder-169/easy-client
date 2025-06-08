"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({
  amount,
  classes,
  prefix, duration
}: {
  amount: number;
  duration?: number;
  classes?: string;
  prefix?: string;
}) => {
  return (
    <CountUp
      className={`w-full ${classes}`}
      decimals={2}
      duration={duration || 2}
      prefix={prefix}
      decimal="."
      end={amount}
    />
  );
};

export default AnimatedCounter;
