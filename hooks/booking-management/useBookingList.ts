import { fetchBookingList } from "@/service/booking-management/bookingManagementServices"
import { useQuery } from "@tanstack/react-query"

export const useBookingList = (page: number = 1, limit: number = 10, search?: string, status?: string) => {
    return useQuery({
        queryKey: ['booking-list', page, limit, search, status],
        queryFn: () => fetchBookingList(page, limit, search, status),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000
    })
}