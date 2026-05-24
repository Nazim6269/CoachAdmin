import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/service/user-management/userManagementServices"

export const useDeleteUser = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["user-list"] })
        }
    })
}
