"use client";
import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { FiCreditCard, FiHome, FiUser } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PiArrowsCounterClockwiseFill } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import Button from "./CustomButton";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  return (
    <div className="border-r border-n-6 flex justify-between bg-n-8 flex-col h-screen">
      <Link href={"/"} className="my-12 block mx-auto">
        <h3 className="text-4xl text-n-1 font-bold">Easy Crypt</h3>
      </Link>
      <nav>
        <ul>
          <li className="">
            <Link
              href={"/"}
              className={`${
                pathname === "/"
                  ? "bg-black/40 font-semibold lg:text-n-1"
                  : "lg:text-n-2"
              } flex gap-4 text-sm uppercase font-code items-center hover:bg-n-6  transition-all duration-200 w-full px-8 py-3 ease-in`}
            >
              {" "}
              <FiHome /> Home{" "}
            </Link>
          </li>
          <li className="">
            <Link
              href={"/transfer"}
              className={`${
                pathname === "/transfer"
                  ? "bg-black/40 font-semibold lg:text-n-1"
                  : "lg:text-n-2"
              } flex gap-4 text-sm uppercase font-code items-center hover:bg-n-6 transition-all duration-200 w-full px-8 py-3 ease-in`}
            >
              {" "}
              <FaMoneyBillTransfer /> Transfer{" "}
            </Link>
          </li>

          <li>
            <Link
              href={"/convert"}
              className={`${
                pathname === "/convert"
                  ? "bg-black/40 font-semibold lg:text-n-1"
                  : "lg:text-n-2"
              } flex gap-4  text-sm uppercase font-code items-center hover:bg-n-6 transition-all duration-200 w-full px-8 py-3 ease-in`}
            >
              {" "}
              <PiArrowsCounterClockwiseFill /> Convert to PKR{" "}
            </Link>
          </li>
          <li className="">
            <Link
              href={"/transactions"}
              className={`${
                pathname === "/transactions"
                  ? "bg-black/40 font-semibold lg:text-n-1"
                  : "lg:text-n-2"
              } flex gap-4 text-sm uppercase font-code items-center hover:bg-n-6 transition-all duration-200 w-full px-8 py-3 ease-in`}
            >
              {" "}
              <LiaMoneyBillSolid /> Transactions{" "}
            </Link>
          </li>
          <li>
            <Link
              href={"/your-cards"}
              className={`${
                pathname === "/your-cards"
                  ? "bg-black/40 font-semibold lg:text-n-1"
                  : "lg:text-n-2"
              } flex gap-4 text-sm uppercase font-code items-center hover:bg-n-6 transition-all duration-200 w-full px-8 py-3 ease-in`}
            >
              {" "}
              <FiUser /> My Account{" "}
            </Link>
          </li>
        </ul>
      </nav>
      {status === "loading" ? (
        <Skeleton className="ml-6 h-10 w-[270px]" />
      ) : status === "authenticated" ? (
        <div className="flex items-center justify-between mx-4 mb-8 gap-2">
          <div className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src="/user.jpg"
              className="rounded-full"
              alt=""
            />
            <Link href={"/my-account"}>
              <h2 className="text-n-2 block text-sm">
                {session?.user?.username}
              </h2>
              <span className="text-n-4 block text-xs">
                {session.user?.email}
              </span>
            </Link>
          </div>
          <button
            onClick={() => {
              toast.success("Sign Out Successful");
              signOut({ callbackUrl: "/sign-in", redirect: true });
            }}
            type="button"
          >
            <BiLogOut className="text-xl text-white" />
          </button>
        </div>
      ) : (
        <div className="pb-12 mx-auto w-4/5">
          <Button href="/sign-in" className="w-full" white>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
