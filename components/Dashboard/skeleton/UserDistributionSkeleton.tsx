import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const UserDistributionSkeleton = () => {
    return (
        <div
            className="bg-[#1b1b1b] rounded-lg p-4 w-full lg:w-[339px] border border-[#2d2d2d]"
            aria-hidden="true"
        >
            <Skeleton className="h-5 w-36 rounded-md mb-1" />
            <div className="border-b border-gray-700 mb-4" />

            <div className="flex items-center justify-center" style={{ height: 242 }}>
                <div className="relative flex items-center justify-center">
                    <Skeleton className="w-[144px] h-[144px] rounded-full" />
                    <div className="absolute w-[110px] h-[110px] rounded-full bg-[#1b1b1b] flex items-center justify-center">
                        <Skeleton className="w-[70px] h-[70px] rounded-full" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
                {[0, 1].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-2.5 h-2.5 rounded-full shrink-0" />
                            <Skeleton className="h-3.5 w-16 rounded-md" />
                        </div>
                        <Skeleton className="h-3.5 w-8 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserDistributionSkeleton