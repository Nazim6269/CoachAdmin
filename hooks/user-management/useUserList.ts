import { fetchUserList } from "@/service/user-management/userManagementServices"
import { useQuery } from "@tanstack/react-query"

export const useUserList = (page: number = 1, limit: number = 10, search?: string, role?: string, status?: string) => {
    return useQuery({
        queryKey: ['user-list', page, limit, search, role, status],
        queryFn: () => fetchUserList(page, limit, search, role, status),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 30 * 1000
    })
}