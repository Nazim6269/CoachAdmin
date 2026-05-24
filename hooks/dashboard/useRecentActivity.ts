import { fetchRecentActivity } from "@/lib/service/activityService"
import { useQuery } from "@tanstack/react-query"


export const useRecentActivity = (limit = 5) => {
    return useQuery({
        queryKey: ['recent-activity', limit],
        queryFn: () => fetchRecentActivity(limit),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000
    })
}