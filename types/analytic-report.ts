export interface AnalyticsOverview {
    data: {
        totalRevenue: number;
        userGrowth: number;
        sessionVolume: number;
        completed: number;
        cancelled: number;
    };
}

export interface RevenueTrend {
    month: string,
    revenue: number
    label: string
}

export interface RevenueTrendResponse {
    data: RevenueTrend[]
}

export interface SessionTypeResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        type: string;
        count: number;
    }[];
}