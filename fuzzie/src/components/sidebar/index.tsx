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

const Sidebar = () => {
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
                  <li
                    className="flex flex-col items-start"
                    onMouseEnter={() => setHoveredItem(menuItem.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
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
                    </div>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                  onMouseEnter={() => setHoveredItem(menuItem.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <li>
                    {hoveredItem === menuItem.name &&
                      menuItem.submenu.length > 0 && (
                        <ul className="ml-4 mt-2">
                          {menuItem.submenu.map((subItem) => (
                            <li key={subItem.name} className="w-full">
                              <Link
                                href={subItem.href}
                                className="flex items-center w-full rounded-lg p-[3px] cursor-pointer"
                              >
                                <span className="text-white">
                                  {subItem.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>

        <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]"></div>
      </div>
    </nav>
  );
};

export default Sidebar;
