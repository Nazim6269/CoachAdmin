'use client'

import { Skeleton } from '@/components/ui/skeleton'
import UserActivityCard from './UserActivityCard'
import { useRecentActivity } from '@/hooks/dashboard/useRecentActivity'
import UserActivityCardSkeleton from '../skeleton/UserActivitySkeleton'
import { DEMO_RECENT_ACTIVITY } from '@/public/demoData/DemoData'

const ACTIVITY_FETCH_LIMIT = 5

const RecentActivitySection = () => {
    const { data, isLoading, isError } = useRecentActivity(5)
    const hasRealData = !!(data?.data?.length)
    const recentActivity = hasRealData ? data.data : DEMO_RECENT_ACTIVITY
    return (
        <div className='flex flex-col bg-[#1b1b1b] rounded-lg p-4 w-full border border-[#2d2d2d] mt-4'>
            <div className='flex items-center justify-between'>
                <h3 className="text-md font-semibold text-whiteColor">Recent Activity</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                {isLoading && !hasRealData ? Array.from({ length: ACTIVITY_FETCH_LIMIT }).map((_, i) => (
                    <UserActivityCardSkeleton key={i} />
                )) : recentActivity.map((activity, index) => (
                    <UserActivityCard activity={activity} key={index} />
                ))}

            </div>
        </div>
    )
}

export default RecentActivitySection