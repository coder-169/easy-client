"use client";
// import React from "react";
// import { HiMenuAlt4 } from "react-icons/hi";
// import { AiOutlineClose } from "react-icons/ai";
// import Link from "next/link";
// import Button from "./Button";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { FaUser } from "react-icons/fa";

// const NavBarItem = ({
//   title,
//   classes,
//   href,
// }: {
//   title: string;
//   classes?: string;
//   href: string;
// }) => (
//   <li className={`mx-4 cursor-pointer ${classes}`}>
//     <Link className="font-medium" href={href.toLowerCase()}>
//       {title}
//     </Link>
//   </li>
// );

// const Navbar = () => {
//   const [toggleMenu, setToggleMenu] = React.useState(false);
//   const { status } = useSession();
//   return (
//     <nav className="w-full flex md:justify-center sticky top-0 bg-white shadow-sm justify-between items-center p-4">
//       <div className="md:flex-[0.5] flex-initial justify-center items-center">
//         <Image
//           width={250}
//           height={80}
//           src={"/logo-light.png"}
//           alt="logo"
//           className="h-auto invert cursor-pointer"
//         />
//       </div>
//       <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
//         {["Transfer", "Withdraw", "Convert", "Transactions"].map(
//           (item, index) => (
//             <NavBarItem key={item + index} title={item} href={item} />
//           )
//         )}
//         {status === "unauthenticated" ? (
//           <li>
//             <Link href="/sign-in" className="text-white">
//               <Button type="button" text="Login" />
//             </Link>
//           </li>
//         ) : (
//           <li>
//             <Link href="/my-account" className="">
//               <FaUser className="text-black text-xl" />
//             </Link>
//           </li>
//         )}
//       </ul>
//       <div className="flex relative">
//         {!toggleMenu && (
//           <HiMenuAlt4
//             fontSize={28}
//             className=" md:hidden cursor-pointer"
//             onClick={() => setToggleMenu(true)}
//           />
//         )}
//         {toggleMenu && (
//           <AiOutlineClose
//             fontSize={28}
//             className=" md:hidden cursor-pointer"
//             onClick={() => setToggleMenu(false)}
//           />
//         )}
//         {toggleMenu && (
//           <ul
//             className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
//             flex flex-col justify-start items-end rounded-md blue-glassmorphism  animate-slide-in"
//           >
//             <li className="text-xl w-full my-2">
//               <AiOutlineClose onClick={() => setToggleMenu(false)} />
//             </li>
//             {["Market", "Exchange", "Tutorials", "Wallets"].map(
//               (item, index) => (
//                 <NavBarItem
//                   key={item + index}
//                   title={item}
//                   href={item}
//                   classprops="my-2 text-lg"
//                 />
//               )
//             )}
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
// import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./CustomButton";
import Image from "next/image";
import { background } from "../assets";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// Shad
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

function DropdownMenuDemo({ avatar }: { avatar: string }) {
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
            <Image src={avatar} width={24} height={24} alt="Username" />
          ) : (
            <FaUserCircle className="w-6 h-6" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-n-7 !-right-4 border-none ring-0 absolute top-4">
        <DropdownMenuItem>
          <Link
            href={"/cards"}
            className="hover:bg-n-8 transition-all duration-200 w-full p-2 rounded-lg px-3"
          >
            Your Cards
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/orders"}
            className="hover:bg-n-8 transition-all duration-200 w-full p-2 rounded-lg px-3"
          >
            Your Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/transfer"}
            className="hover:bg-n-8 transition-all duration-200 w-full p-2 rounded-lg px-3"
          >
            Transfer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/transfer"}
            className="hover:bg-n-8 transition-all duration-200 w-full p-2 rounded-lg px-3"
          >
            Transaction History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/convert"}
            className="hover:bg-n-8 transition-all duration-200 w-full p-2 rounded-lg px-3"
          >
            Convert
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/my-account"}
            className="hover:bg-n-8 transition-all duration-200 w-full p-2 rounded-lg px-3"
          >
            Profile{" "}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-n-5 " />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer hover:bg-n-8 transition-all duration-200 w-full"
        >
          <span className="px-2">Log out</span>
          <DropdownMenuShortcut>
            <FaSignOutAlt />
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
  console.log(brainwave);
  const { status, data: session } = useSession();
  console.log(session);
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <Image
            src={"/logo-light.png"}
            width={190}
            height={40}
            alt="Brainwave"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
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

        {status !== "authenticated" ? (
          <Link
            href="/signup"
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            New account
          </Link>
        ) : (
          ""
        )}
        {status !== "authenticated" ? (
          <Button className="hidden lg:flex" href="/sign-in">
            Sign in
          </Button>
        ) : (
          <>
            {" "}
            <span className="mr-2 text-sm">
              Welcome, {session?.user?.username}👋
            </span>
            <DropdownMenuDemo avatar={session?.user?.avatar} />
          </>
        )}

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
