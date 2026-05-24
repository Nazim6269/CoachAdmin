export interface RecentActivity {
    user_avatar_url: string;
    name: string;
    time_ago: string;
    timeInNumber: string;
    img?: string;
    message: string;
    activity_date: string;
}

export interface RecentActivityResponse {
    data: RecentActivity[];
}

export interface UserDistributionResponse {
    data: {
        total: number,
        coaches: number,
        athletes: number
    }
}

export interface OverviewResponse {
    data: {
        totalUsers: number,
        activeUsers: number,
        totalSessions: number,
        monthlyRevenue: number
    }
}

export interface RevenueTrend {
    month: string,
    revenue: number
}

export interface RevenueTrendResponse {
    data: RevenueTrend[]
}