import { fetchRevenueTrendService } from "@/service/dashboard/dashboardServices";
import { useQuery } from "@tanstack/react-query";

export function useRevenueTrend(months) {
    return useQuery({
        queryKey: ['revenue-trend', months],
        queryFn: () => fetchRevenueTrendService(months),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000

    })
}