'use client'

import { Notebook } from "lucide-react";
import StatCards from "./StateCards";
import DashboardUserTable from "./DashboardUserTable";
import SingleUserIcon from "@/icons/SingleUserIcon";
import TotalUsersIcon from "@/icons/TotalUsersIcon";
import ContentIcon from "@/icons/ContentIcon";
import DollarIcon from "@/icons/DollarIcon";
import ReveneuTrendSection from "./shared/ReveneuTrendSection";
import RecentActivitySection from "./shared/RecentActivitySection";
import { useOverview } from "@/hooks/dashboard/useOverview";
import { DEMO_OVERVIEW } from "@/public/demoData/DemoData";


function DashboardPage() {

  const { data, isLoading, isError } = useOverview()
  const apiData = data?.data
  const showDemo = !isLoading && (isError || !apiData)

  const overviewData = showDemo ? DEMO_OVERVIEW : (apiData ?? DEMO_OVERVIEW)

  const mappedData = [
    {
      icon: <TotalUsersIcon />,
      title: "Total Users",
      value: overviewData.totalUsers
    },
    {
      icon: <SingleUserIcon />,
      title: "Active Users",
      value: overviewData.activeUsers
    },
    {
      icon: <ContentIcon />,
      title: "Total Sessions",
      value: overviewData.totalSessions,
    },
    {
      icon: <DollarIcon />,
      title: "Monthly Revenue",
      value: overviewData.monthlyRevenue,
    },

  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <StatCards statCards={mappedData} isLoading={isLoading && !showDemo} isError={isError && !showDemo} />
      </div>

      <div className="mt-4">
        <ReveneuTrendSection />
        <RecentActivitySection />
      </div>
    </div>
  );
}

export default DashboardPage;
