"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import clsx from "clsx";
// import { Separator } from "@/components/ui/Separator";

const Sidebar = () => {
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 dark:bg-black h-screen overflow-scroll flex flex-col gap-10 py-6 px-2 w-16 hover:w-64 transition-all duration-300 ease-in-out z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center flex-col gap-8 w-full">
        <Link className="flex font-bold flex-row" href="/">
          fuzzie.
        </Link>
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name} className="w-full">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <li className="flex items-center">
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        "group flex items-center w-full rounded-lg p-[3px] cursor-pointer",
                        {
                          "dark:bg-[#2F006B] bg-[#EEE0FF]":
                            pathName === menuItem.href,
                          "justify-center": !isHovered,
                          "justify-start": isHovered,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                      {isHovered && (
                        <span className="ml-4 text-white">{menuItem.name}</span>
                      )}
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        {/* <Separator /> */}
        <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]"></div>
      </div>
    </nav>
  );
};

export default Sidebar;
