export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
    type: "bearer";
}

export interface LoginApiResponse {
    success: boolean;
    message: string;
    authorization: AuthTokens;
    type: "coach" | "admin" | "user";
}

export interface AuthUser {
    email: string;
    role: string;
    access_token: string;
    refresh_token: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface VerifyEmailPayload {
    email: string;
    otp: string;
}

export interface ResetPasswordPayload {
    email: string;
    otp: string;
    new_password: string;
}

export interface ResendOtpPayload {
    email: string;
}

export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    // Add other user properties as needed
}

export interface UserResponse {
    data: User;
}