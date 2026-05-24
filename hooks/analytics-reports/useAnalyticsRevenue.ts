import { fetchRevenueAnalyticsService } from "@/service/analytics-reports/analyticReportServices"
import { useQuery } from "@tanstack/react-query"

export const useAnalyticsRevenue = (months: number = 12) => {
    return useQuery({
        queryKey: ['analytics-revenue'],
        queryFn: () => fetchRevenueAnalyticsService(months),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000
    })
}