import { fetchDistributionService } from "@/service/dashboard/dashboardServices"
import { useQuery } from "@tanstack/react-query"

export const useDistributionActivity = () => {
    return useQuery({
        queryKey: ['user-distribution'],
        queryFn: () => fetchDistributionService(),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000

    })
}