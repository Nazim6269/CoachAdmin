import { patchUser } from "@/service/user-management/userManagementServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePatchUser = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => patchUser(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["user-list"] })
        }
    })
}