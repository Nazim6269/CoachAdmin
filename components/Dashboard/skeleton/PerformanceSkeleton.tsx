import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PerformanceSkeleton = () => {
    return (
        <div className="flex justify-between items-center pb-3">
            {/* Label skeleton */}
            <Skeleton className="h-4 w-32 bg-gray-700/40" />

            <div className="flex items-center gap-3">
                {/* Value skeleton */}
                <Skeleton className="h-4 w-10 bg-gray-700/40" />

                {/* Change badge skeleton */}
                <Skeleton className="h-6 w-12 rounded bg-gray-700/40" />
            </div>
        </div>
    )
}

export default PerformanceSkeleton