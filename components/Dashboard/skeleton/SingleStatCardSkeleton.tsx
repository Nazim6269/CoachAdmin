"use client";

import { Skeleton } from "@/components/ui/skeleton";


export const SingleStatCardSkeleton = () => (
    <div
        className="bg-primaryColor p-6 rounded-xl shadow-md w-full"
        aria-hidden="true"
    >
        <div className="flex items-center justify-start gap-4">
            <Skeleton className="w-14 h-14 rounded-full bg-secondaryColor shrink-0" />

            <div className="flex flex-col gap-3">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-7 w-16 rounded-md" />
            </div>
        </div>
    </div>
);

