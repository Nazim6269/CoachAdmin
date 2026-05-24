import { useQuery } from "@tanstack/react-query"
import { fetchPerformanceData } from "@/service/booking-management/bookingManagementServices"

export const usePerformance = () => {
    return useQuery({
        queryKey: ["performance"],
        queryFn: fetchPerformanceData,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 30
    })
}