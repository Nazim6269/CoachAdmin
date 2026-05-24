import { apiClient } from "@/lib/api/client";
import { AnalyticsOverview, RevenueTrendResponse, SessionTypeResponse } from "@/types/analytic-report";



export const getAnalyticsOverview = async (): Promise<AnalyticsOverview> => {
    const response = await apiClient.get<AnalyticsOverview>('/admin/analytics-reports/overview');
    return response
}

export const fetchRevenueAnalyticsService = async (months: number = 12): Promise<RevenueTrendResponse> => {

    const response = await apiClient.get<RevenueTrendResponse>(`/admin/analytics-reports/revenue-analytics?months=${months}`)
    return response
}

export const fetchSessionType = async (): Promise<SessionTypeResponse> => {
    const response = await apiClient.get<SessionTypeResponse>("/admin/analytics-reports/session-types")
    return response
}
