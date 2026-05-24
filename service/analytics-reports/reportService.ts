

import { apiClient } from "@/lib/api/client";

export const reportsApi = {
    downloadActivityReport(period: string): Promise<Blob> {
        return apiClient.download(`/admin/analytics-reports/export/user-activity?period=${period}`);
    },

    downloadRevenueReport(period: string): Promise<Blob> {
        return apiClient.download(`/admin/analytics-reports/export/revenue?period=${period}`);
    },

    downloadSessionsReport(period: string): Promise<Blob> {
        return apiClient.download(`/admin/analytics-reports/export/session-statistics?period=${period}`);
    },

    downloadAnalyticsReport(period: string): Promise<Blob> {
        return apiClient.download(`/admin/analytics-reports/export/analytics?period=${period}`);
    },

    downloadCoachPerformanceReport(period: string): Promise<Blob> {
        return apiClient.download(`/admin/analytics-reports/export/coach-performance?period=${period}`);
    },
};