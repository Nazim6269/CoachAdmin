import { PaginationProps } from "./user-management"

export interface Metric {
    value: number
    change: number
    is_positive: boolean
    unit?: string
}

export interface MetricsResponse {
    success: boolean
    statusCode: number
    message: string
    data: Record<string, Metric>
}

export interface BookedUserDetails {
    data: {
        id: string;
        appointment_date: string;
        coach_name: string;
        coach_specialization: string;
        coach_avatar: string;
        rating: string;
        reviews: string;
        badges: string;
        athlete: {
            id: string;
            name: string;
            email: string;
            avatar: string;
        };
        coach: {
            id: string;
            name: string;
            email: string;
            avatar: string;
            specialties: string;
            specialties_array: string[];
            rating: string;
            rating_display: string;
        };
        coach_availability: {
            available_days: string[];
            weekend_days: string[];
            blocked_days: string[];
        };
        created_at: string;
        currency: string;
        date: string;
        date_time: string;
        description: string;
        duration: string;
        duration_minutes: number;
        google_map_link: string;
        location: string;
        notes: string;
        price: string;
        session_package_id: string;
        session_price: number;
        session_time: string;
        status: string;
        time: string;
        title: string;
        updated_at: string;
    }
}

export interface Appointment {
    id: string;
    athlete_name: string;
    athlete_avatar: string;
    session_type: string | null;
    coach_name: string;
    coach_specialization: string;
    date_time: string;
    status: "PENDING" | "UPCOMING" | "CANCELLED" | "COMPLETED";
    appointment_date: string;
    session_time: string | null;
    duration_minutes: number;
    location: string;
    description: string | null;
    notes: string;
    created_at: string;
}

export interface BookingListResponse {
    data: {
        data: Appointment[];
        pagination: PaginationProps,
    }
    success: boolean,
    statusCode: number,
    message: string
}