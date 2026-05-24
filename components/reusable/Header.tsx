"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import DynamicDropDown from "./DynamicDropDown";
import getDashboardTitle from "@/helper/getDashboardTitle";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/hooks/auth/useUser";
import { fetchUser } from "@/service/auth/authResetService";



interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  sidebarOpen,
}: HeaderProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const pathname = usePathname();
  const title = getDashboardTitle(pathname);
  const [selectedRole, setSelectedRole] = useState("Admin");

  const user = useAuthStore((state) => state.user);
  const { data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  })

  const name = data?.data?.name

  return (
    <nav className=" text-whiteColor bg-primaryColor border-borderColor  py-3">
      <div className=" px-3  md:px-6   relative flex justify-between w-full mb-1 z-50">
        {/* Mobile menu button */}
        <div>
          <div className=" xl:hidden h-full flex items-center">
            <button
              onClick={onMenuClick}
              className=" pr-2 py-2  text-[#4A4C56]"
            >
              {sidebarOpen ? (
                <X className=" z-50 bg-black " />
              ) : (
                <Menu className="text-whiteColor" />
              )}
            </button>
          </div>
        </div>

        {/* Notification and Profile Group */}
        <div className="flex items-center gap-2 lg:gap-6 justify-end w-full">
          <div className=" hidden md:block w-full ">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-5 justify-end w-full">

            <h3 className="text-[14px] md:text-lg font-bold">Welcome Back, {name}</h3>


            <div className="  relative sm:ml-0">
              <DynamicDropDown label={selectedRole} menuItems={["Admin"]} className="bg-gray-100/30  w-[90px] md:w-[120px]" onSelect={setSelectedRole} />
            </div>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen} >
              <PopoverTrigger
                className="cursor-pointer relative  justify-center items-center hidden md:block"
                onClick={() => setPopoverOpen(!popoverOpen)}
              >

                <MdNotifications className="text-whiteColor" size={24} />
              </PopoverTrigger>

              <PopoverContent className="w-70 md:w-[267px] mt-4 p-0 max-h-[500px] flex flex-col border-0" side="bottom"
                align="end"
               >
                {/* Header */}
                <div className="flex justify-between bg-secondaryColor items-center p-4 border-b sticky top-0 z-10">
                  <h4 className="text-base text-whiteColor font-bold md:text-lg ">
                    Notifications
                  </h4>

                  <button
                    onClick={() => setPopoverOpen(false)}
                    className="text-[#455468] bg-bgColor w-[28px] h-[28px] shadow-sm rounded-full cursor-pointer text-lg font-bold flex items-center justify-center"
                  >
                    <X className="" />
                  </button>
                </div>

                <div className="overflow-y-auto px-4 py-3 flex-1 bg-secondaryColor ">
                  <p className="text-center text-sm text-gray-500 py-6">
                    No notifications available
                  </p>
                </div>
              </PopoverContent>
            </Popover>


          </div>
        </div>
      </div>
      <div className=" md:hidden px-4">
        <h1 className="hidden md:block text-2xl font-bold">Admin Dashboard</h1>
      </div>
    </nav>
  );
};

export default Header;
