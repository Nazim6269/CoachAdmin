import { deleteBookedUser } from "@/service/booking-management/bookingManagementServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteBookedUser = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteBookedUser(id),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ["booking-list"]
            })
        }
    })
}