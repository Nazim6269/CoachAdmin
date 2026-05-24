import { fetchBookedUserDetails } from "@/service/booking-management/bookingManagementServices"
import { useQuery } from "@tanstack/react-query"

export const useBookedUsserDetails = (id: string) => {
    return useQuery({
        queryKey: ['booked-user-details', id],
        queryFn: () => fetchBookedUserDetails(id),

        enabled: !!id,

        staleTime: 60 * 60 * 1000,
        retry: 2,
        retryDelay: 1000,

        refetchInterval: 3000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true
    })
}