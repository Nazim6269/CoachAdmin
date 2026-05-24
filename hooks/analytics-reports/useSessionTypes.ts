import { fetchSessionType } from "@/service/analytics-reports/analyticReportServices"
import { useQuery } from "@tanstack/react-query"

export const useSessionTypes = () => {
    return useQuery({
        queryKey: ["session-types"],
        queryFn: () => fetchSessionType(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchInterval: 5 * 60 * 1000,
    })
}