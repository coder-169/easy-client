"use client";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./CustomButton";
import Image from "next/image";
import { background } from "../assets";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

// Shad
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaUserCircle } from "react-icons/fa";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

function DropdownMenuDemo({
  avatar,
  eth,
  pkr,
  username,
  email,
}: {
  avatar: string;
  eth: string;
  pkr: string;
  username: string;
  email: string;
}) {
  const logout = () => {
    signOut({
      callbackUrl: "/sign-in",
      redirect: true,
    });
    toast.success("You have been logged out");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          {avatar ? (
            <Image
              src={avatar}
              width={24}
              height={24}
              className="rounded-full"
              alt="Username"
            />
          ) : (
            <FaUserCircle className="w-6 h-6" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-n-7 !-right-4 border-none ring-0 absolute top-4">
        <div className="mt-4 mb-8 flex justify-center flex-col items-center gap-2">
          {avatar ? (
            <Image
              src={avatar}
              width={96}
              height={96}
              className="rounded-full"
              alt="Username"
            />
          ) : (
            <FaUserCircle className="w-24 h-24" />
          )}
          <div className="mb-2 text-center">
            <h4 className="text-n-1">{username}</h4>
            <span className="text-sm text-n-2">{email}</span>
          </div>
          <div className="flex gap-2 mt-2 w-full">
            <span className="border-r border-r-gray-200 pr-2 w-1/2 text-right text-white text-sm">
              Rs. {pkr}
            </span>
            <span className="w-1/2 text-left text-white text-sm">
              Eth. {eth}
            </span>
          </div>
        </div>
        <DropdownMenuItem className="cursor-pointer hover:bg-n-8 transition-all duration-200 w-full">
          <Link href="/profile">
            <span className="px-2">Dashboard</span>
          </Link>
          <DropdownMenuShortcut>
            <MdOutlineDashboardCustomize fontSize={20} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-n-5 " />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer hover:bg-n-8 transition-all duration-200 w-full"
        >
          <span className="px-2">Log out</span>
          <DropdownMenuShortcut>
            <PiSignOutBold fontSize={20} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };
  const { status, data: session } = useSession();
  const newNavigation =
    status === "authenticated"
      ? [
          ...navigation.slice(0, 3),
          {
            id: "5",
            title: "Dashboard",
            url: "/profile",
            onlyMobile: true,
          },
        ]
      : navigation;
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          {/* <Image
            src={"/logo-light.png"}
            width={190}
            height={40}
            alt="Brainwave"
          /> */}
          <h3 className="text-xl md:text-2xl text-n-1 font-bold">
            Easy
            <span className="text-color-1">Krypt</span>
          </h3>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {newNavigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        <div className="hidden lg:flex gap-4 items-center">
          {status === "loading" ? (
            <Skeleton className="w-[120px] h-10" />
          ) : status === "authenticated" ? (
            ""
          ) : (
            <Link
              href="/sign-up"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </Link>
          )}
          {status === "loading" ? (
            <Skeleton className="w-[120px] h-10" />
          ) : status === "authenticated" ? (
            <DropdownMenuDemo
              avatar={session?.user?.avatar}
              pkr={session?.user?.balancePkr.toFixed(2)}
              eth={session?.user?.balanceEth.toFixed(3)}
              username={session?.user?.username}
              email={session?.user?.email}
            />
          ) : (
            <Button className="hidden lg:flex" href="/sign-in">
              Sign in
            </Button>
          )}
        </div>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export const Rings = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2">
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export const SideLines = () => {
  return (
    <>
      <div className="absolute top-0 left-5 w-0.25 h-full bg-n-6"></div>
      <div className="absolute top-0 right-5 w-0.25 h-full bg-n-6"></div>
    </>
  );
};

export const BackgroundCircles = () => {
  return (
    <>
      <div className="absolute top-[4.4rem] left-16 w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[12.6rem] right-16 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[26.8rem] left-12 w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full"></div>
    </>
  );
};

export const HamburgerMenu = () => {
  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden">
      <div className="absolute inset-0 opacity-[.03]">
        <Image
          className="w-full h-full object-cover"
          src={background}
          width={688}
          height={953}
          alt="Background"
        />
      </div>

      <Rings />

      <SideLines />

      <BackgroundCircles />
    </div>
  );
};

export default Header;
