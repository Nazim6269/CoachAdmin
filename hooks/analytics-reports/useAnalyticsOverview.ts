import { getAnalyticsOverview } from "@/service/analytics-reports/analyticReportServices";
import { useQuery } from "@tanstack/react-query";

export const useAnalyticsOverview = () => {
    return useQuery({
        queryKey: ['analytics-overview'],
        queryFn: () => getAnalyticsOverview(),
        staleTime: 5 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
    })
}