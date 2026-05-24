import { apiClient } from "@/lib/api/client"



export interface RecentActivity {
    data: {
        id: string;
        activity_date: string;
        activity_meta: string;
        created_at: string;
        message: string;
        receiver: {
            id: string;
            name: string | null;
            avatar: string | null;
            avatar_url: string | null;
        };
        sender: string | null;
        time_ago: string;
        type: string;
        user_avatar_url: string | null;
    }[]
}

export const fetchRecentActivity = async (limit: number = 5): Promise<RecentActivity> => {

    const response = await apiClient.get<RecentActivity>(`/admin/users/recent-activity?limit=${limit}`, {
        requiresAuth: true
    })
    return response;
}