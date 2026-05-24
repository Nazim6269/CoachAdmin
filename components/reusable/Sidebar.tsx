"use client";

import { CookieHelper } from "@/helper/cookie.helper";
import { useLogout } from "@/hooks/auth/useLogout";
import AnalyticsIcon from "@/icons/AnalyticsIcon";
import BookingIcon from "@/icons/BookingIcon";
import ContentIcon from "@/icons/ContentIcon";
import DashboardIcon from "@/icons/DashboardIcon";
import GamifyIcon from "@/icons/GamifyIcon";
import MarketPlaceIcon from "@/icons/MarketPlaceIcon";
import SingleUserIcon from "@/icons/SingleUserIcon";
import SubscriptionIcon from "@/icons/SubscriptionIcon";
import {
  DotIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Settings,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface NavItem {
  icon: any;
  label: string;
  href: string;
  type?: "client" | "admin" | "candidate";
}

interface DashboardMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  type?: "client" | "admin" | "candidate";
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboardIcon,
    label: "Clients",
    href: "/clients/admin/list",
    type: "admin",
  },
  {
    icon: UserIcon,
    label: "Candidates",
    href: "/candidates",
    type: "admin",
  },

  {
    icon: Settings,
    label: "Platform settings",
    href: "/dashboard/platform-settings",
    type: "admin",
  },
  {
    icon: DotIcon,
    label: "More",
    href: "/dashboard/more",
    type: "admin",
  },
];

export const dashboardMenuItems: DashboardMenuItem[] = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon /> },
  { label: "User Management", href: "/dashboard/user-management", icon: <SingleUserIcon /> },
  { label: "Booking Management", href: "/dashboard/booking-management", icon: <BookingIcon /> },
  { label: "Content Management", href: "/dashboard/content-management", icon: <ContentIcon /> },
  { label: "Marketplace Management", href: "/dashboard/marketplace-management", icon: <MarketPlaceIcon /> },
  { label: "Analytics & Reports", href: "/dashboard/analytics-reports", icon: <AnalyticsIcon /> },
  { label: "Subscription Management", href: "/dashboard/subscription-management", icon: <SubscriptionIcon /> },
  { label: "Gamify Management", href: "/dashboard/gamify-management", icon: <GamifyIcon /> },
]

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, error, isPending } = useLogout()

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  const handleLogout = () => {
    CookieHelper.destroy({ key: "accessToken" });
    logout()
    router.push("/dashboard/auth/login");
  };
  return (
    <div className="h-screen  ">
      {/* Sidebar container */}
      <div
        className={`
          ${isOpen
            ? "z-50 h-full w-full overflow-hidden absolute top-0 left-0"
            : "h-full"
          }
          flex flex-col
          min-h-[calc(100vh-100px)] 
          w-full
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          p-3 lg:p-4 overflow-y-auto transition-all duration-300 bg-primaryColor
         
        `}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between  mb-4">
          <Link
            href={"/"}
            className={` flex items-center transition-all duration-300 $`}
          >
            <Image src="/site_logo.png" alt="Logo" width={140} height={40} />
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1">
          <div className="space-y-2">
            {dashboardMenuItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                    hover:text-whiteColor hover:bg-blueColor text-whiteColor transition-all duration-200
                    ${active ? "bg-blueColor opacity-100 text-whiteColor" : ""}
                   
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-whiteColor">
                      {item.icon}
                    </div>
                    <span
                      className={`text-base font-medium text-whiteColor group-hover:text-whiteColor transition-colors duration-200 whitespace-nowrap `}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Log out section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className={`
              flex items-center bg-redColor/70 hover:bg-redColor/80 hover:text-whiteColor  cursor-pointer gap-3 px-3 py-3 
               w-full rounded-lg transition-all duration-200
             
            `}
            title={isCollapsed ? "Log Out Account" : ""} disabled={isPending}
          >
            <div className="w-[30px] h-[30px] flex justify-center text-whiteColor items-center flex-shrink-0">
              <LogOutIcon />
            </div>
            <span className={`text-base font-normal text-whiteColor  whitespace-nowrap `}>
              {isPending ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
