import { Skeleton } from "@/components/ui/skeleton"

const UserActivityCardSkeleton = () => {
    return (
        <div className='relative flex items-center gap-2' aria-hidden="true">
            <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-secondaryColor" />
            <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-3/4 rounded-md bg-secondaryColor" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-16 rounded-md bg-secondaryColor" />
                    <Skeleton className="w-2 h-2 rounded-full bg-secondaryColor" />
                    <Skeleton className="h-3 w-20 rounded-md bg-secondaryColor" />
                </div>
            </div>
        </div>
    )
}

export default UserActivityCardSkeleton