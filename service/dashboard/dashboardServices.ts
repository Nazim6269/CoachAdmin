import { apiClient } from "@/lib/api/client"
import { OverviewResponse, RecentActivityResponse, RevenueTrendResponse, UserDistributionResponse } from "@/types/dashboard";



export const fetchRecentActivity = async (limit: number = 5): Promise<RecentActivityResponse> => {
    const response = await apiClient.get<RecentActivityResponse>(`/admin/users/recent-activity?limit=${limit}`, {
        requiresAuth: true
    })
    return response;
}


export const fetchDistributionService = async (): Promise<UserDistributionResponse> => {
    const response = await apiClient.get<UserDistributionResponse>(`/admin/users/user-distribution`, { requiresAuth: true })

    return response
}

export const fetchOverview = async (): Promise<OverviewResponse> => {
    const response = await apiClient.get<OverviewResponse>('/admin/users/overview')

    return response;
}

export const fetchRevenueTrendService = async (months: string = "Last 12 Months"): Promise<RevenueTrendResponse> => {
    const monthsMap: Record<string, number> = {
        "Last 6 Months": 6,
        "Last 12 Months": 12,
        "Last 24 Months": 24
    };

    const monthsValue = monthsMap[months] || 12;

    const response = await apiClient.get<RevenueTrendResponse>(`/admin/users/revenue-trend?months=${monthsValue}`)
    return response
}