'use client'

import React, { useEffect, useState } from 'react'
import CustomizedLabelLineChart from '../charts/RevenueChart'
import UserDistribution from '../charts/UserDistributionChart'
import DynamicDropDown from '@/components/reusable/DynamicDropDown'
import { useRevenueTrend } from '@/hooks/dashboard/useRevenueTrend'
import { Skeleton } from '@/components/ui/skeleton'
import { DEMO_REVENUE_TREND } from '@/public/demoData/DemoData'

const ReveneuTrendSection = () => {
    const [activePoint, setActivePoint] = useState<any>(undefined);
    const [selectedTime, setSelectedTime] = useState("Last 6 Months");

    const { data: fetchData, isLoading, isError } = useRevenueTrend(selectedTime);
    const revenueTrend = fetchData?.data?.length ? fetchData.data : DEMO_REVENUE_TREND;

    useEffect(() => {
        if (revenueTrend?.length) {
            setActivePoint(revenueTrend[1] ?? revenueTrend[0]);
        }
    }, [revenueTrend]);

    if (isLoading) {
        return <Skeleton className="h-97 w-full rounded-md bg-secondaryColor" />
    }

    return (
        <div className='rounded-lg shadow-md w-full'>
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <h3 className="text-md font-semibold text-whiteColor">Revenue Trend</h3>
                </div>
                <div>
                    <DynamicDropDown label={selectedTime} menuItems={["Last 6 Months", "Last 12 Months", "Last 24 Months"]} onSelect={setSelectedTime} className="bg-gray-100/30 text-whiteColor" />
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 items-stretch'>
                <CustomizedLabelLineChart data={revenueTrend} activePoint={activePoint} setActivePoint={setActivePoint} />
                <UserDistribution />
            </div>

        </div>
    )
}

export default ReveneuTrendSection