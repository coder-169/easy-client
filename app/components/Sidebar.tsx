"use client";
import React from "react";
import Link from "next/link";
import { FiCreditCard, FiHome, FiUser, FiX } from "react-icons/fi";
import { FaGear, FaMoneyBillTransfer } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PiArrowsCounterClockwiseFill } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import Button from "./CustomButton";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = ({ mobile, setMobileOpen }: { mobile?: boolean, setMobileOpen?: (open: boolean) => void }) => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const handleLinkClick = () => {
    if (mobile && setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={`border-r border-n-6 flex justify-between bg-n-8 flex-col h-full ${mobile ? 'w-64 p-4' : 'p-6'}`}>
      {/* Close button for mobile */}
      {mobile && (
        <button 
          onClick={() => setMobileOpen?.(false)}
          className="self-end p-2 mb-4"
        >
          <FiX className="text-white text-xl" />
        </button>
      )}

      <Link href={"/"} className="my-4 md:my-12 block mx-auto" onClick={handleLinkClick}>
        <h3 className="text-2xl md:text-4xl text-n-1 font-bold">Easy <span className="text-color-1">Krypt</span></h3>
      </Link>

      <nav className="flex-1">
        <ul>
          {[
            { href: "/", icon: <FiHome />, text: "Home" },
            { href: "/transfer", icon: <FaMoneyBillTransfer />, text: "Transfer" },
            { href: "/convert", icon: <PiArrowsCounterClockwiseFill />, text: "Convert to PKR" },
            { href: "/transactions", icon: <LiaMoneyBillSolid />, text: "Transactions" },
            { href: "/profile", icon: <FiUser />, text: "Profile" },
            { href: "/settings", icon: <FaGear />, text: "Settings" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "bg-black/40 font-semibold text-n-1"
                    : "text-n-2"
                } flex gap-3 md:gap-4 text-sm uppercase font-code items-center hover:bg-n-6 transition-all duration-200 w-full px-4 py-3 ease-in`}
                onClick={handleLinkClick}
              >
                {item.icon} {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {status === "loading" ? (
        <Skeleton className="h-10 w-full mb-4 md:mb-8" />
      ) : status === "authenticated" ? (
        <div className="flex items-center justify-between mb-4 md:mb-8 gap-2">
          <div className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src="/user.jpg"
              className="rounded-full"
              alt="User profile"
            />
            <Link href={"/profile"} onClick={handleLinkClick}>
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
        <div className="pb-6 md:pb-12 mx-auto w-full px-2">
          <Button href="/sign-in" className="w-full" white onClick={handleLinkClick}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;