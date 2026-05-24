'use client'

import RevenueChart from "../charts/RevenueChart"
import BarChartWithCustomizedEvent from "../charts/BarChart"
import { useState } from "react"
import { useAnalyticsRevenue } from "@/hooks/analytics-reports/useAnalyticsRevenue"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSessionTypes } from "@/hooks/analytics-reports/useSessionTypes"
import { DEMO_ANALYTICS_REVENUE, DEMO_SESSION_TYPES } from "@/public/demoData/DemoData"

const ReveneuAnalytics = () => {
    const [activePoint, setActivePoint] = useState<any>(undefined);
    const { data: fetchData, isLoading, isError } = useAnalyticsRevenue(12);
    const { data: sessionTypeData, isLoading: sessionTypeLoading, isError: sessionTypeError } = useSessionTypes();

    const revenueAnalytics = !isLoading && (isError || !fetchData?.data?.length) ? DEMO_ANALYTICS_REVENUE : fetchData?.data;
    const sessionData = !sessionTypeLoading && (sessionTypeError || !sessionTypeData?.data?.length) ? DEMO_SESSION_TYPES.data : sessionTypeData?.data;
    const mappedData = sessionData?.map((item) => ({
        name: item.type,
        uv: item.count,
        pv: item.count,
        amt: item.count
    }));


    useEffect(() => {
        if (revenueAnalytics?.length) {
            setActivePoint(revenueAnalytics[1] ?? revenueAnalytics[0]);
        }
    }, [revenueAnalytics]);

    if (isLoading && !revenueAnalytics?.length) {
        return <Skeleton className="h-[388px] w-full rounded-md bg-secondaryColor" />
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch justify-between gap-4">
            <RevenueChart data={revenueAnalytics} activePoint={activePoint} setActivePoint={setActivePoint} tag="analytics" />
            <BarChartWithCustomizedEvent data={mappedData} />
        </div>
    )
}

export default ReveneuAnalytics