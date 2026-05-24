import { fetchOverview } from "@/service/dashboard/dashboardServices"
import { useQuery } from "@tanstack/react-query"

export const useOverview = () => {
    return useQuery({
        queryKey: ['overview'],
        queryFn: () => fetchOverview(),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000
    })
}