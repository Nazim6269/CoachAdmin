'use client'

import RevenueChart from "../charts/RevenueChart"
import BarChartWithCustomizedEvent from "../charts/BarChart"
import { useState } from "react"
import { useAnalyticsRevenue } from "@/hooks/analytics-reports/useAnalyticsRevenue"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSessionTypes } from "@/hooks/analytics-reports/useSessionTypes"

const ReveneuAnalytics = () => {
    const [activePoint, setActivePoint] = useState<any>(undefined);
    const { data: fetchData, isLoading, isError } = useAnalyticsRevenue(12);
    const { data: sessionTypeData, isLoading: sessionTypeLoading, isError: sessionTypeError } = useSessionTypes();

    const revenueAnalytics = fetchData?.data;
    const sessionTypeAnalytics = sessionTypeData?.data;
    const mappedData = sessionTypeAnalytics?.map((item) => ({
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

    if (isLoading) {
        return <Skeleton className="h-[388px] w-full rounded-md bg-secondaryColor" />
    }

    if (isError || !revenueAnalytics?.length) {
        return (
            <div style={{
                background: "#1b1b1b", borderRadius: "16px",
                padding: "32px 24px", width: "100%",
                border: "1px solid rgba(255,255,255,0.06)",
                height: 388, display: "flex",
                alignItems: "center", justifyContent: "center",
            }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                    {isError ? "Failed to load revenue data." : "No data available."}
                </p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch justify-between gap-4">
            <RevenueChart data={revenueAnalytics} activePoint={activePoint} setActivePoint={setActivePoint} tag="analytics" />
            <BarChartWithCustomizedEvent data={mappedData} />
        </div>
    )
}

export default ReveneuAnalytics