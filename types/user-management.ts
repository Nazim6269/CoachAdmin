export interface UserDetailsProps {
    age?: number;
    avatar?: string;
    created_at?: string;
    current_goals?: string[];
    demographics?: string;
    description?: string;
    email?: string;
    gender?: string;
    goals?: string[];
    id?: string;
    joining_date?: string;
    level?: string;
    location?: string;
    name?: string;
    objectives?: string;
    phone_number?: string;
    role?: string;
    sports?: string;
    rating?: number;
    reviews?: number;
    languages?: string; certifications?: string[], specialties?: string[]
    statistics?: { sessions_completed?: number; total_sessions?: number };
    status?: string;
    bio?: string;
    address?: string;
}


export interface UserDetailsResponse {
    data: UserDetailsProps;
    message: string;
    statusCode: number;
    success: boolean;
}

export type PaginationProps = {
    page: number,
    limit: number,
    total: number,
    total_pages: number,
    has_next_page: boolean,
    has_previous_page: boolean
}

export interface User {
    id: string,
    user_name: string,
    role: string,
    email: string,
    joining_date: string,
    status: string,
    avatar: string
}

export interface UserListResponse {
    data: {
        data: User[],
        pagination: PaginationProps
    }
}

