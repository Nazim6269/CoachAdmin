import { useQuery } from "@tanstack/react-query"
import { fetchUserDetails } from "@/service/user-management/userManagementServices"

export const useUserDetails = (id: string) => {

    return useQuery({
        queryKey: ['details', id],
        queryFn: () => fetchUserDetails(id), staleTime: 2 * 60 * 1000, refetchInterval: 30 * 1000
    })
}