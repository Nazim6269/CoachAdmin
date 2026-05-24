import { patchBookedUserStatus } from "@/service/booking-management/bookingManagementServices"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

export const usePatchBookedUser = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => patchBookedUserStatus(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["booking-list"] })
        }
    })
}