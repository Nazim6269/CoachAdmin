
import { apiClient } from "@/lib/api/client";
import { ForgotPasswordPayload, VerifyEmailPayload, ResetPasswordPayload, ResendOtpPayload, ApiResponse, UserResponse } from "@/types/auth";

export const forgotPasswordService = async (
    payload: ForgotPasswordPayload
): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
        "/auth/forgot-password",
        payload,
        { requiresAuth: false }
    );
    return response;
};


export const verifyEmailOtpService = async (
    payload: VerifyEmailPayload
): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
        "/auth/verify-email",
        payload,
        { requiresAuth: false }
    );
    return response;
};


export const resetPasswordService = async (
    payload: ResetPasswordPayload
): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
        "/auth/reset-password",
        payload,
        { requiresAuth: false }
    );
    return response;
};

export const resendOtpService = async (
    payload: ResendOtpPayload
): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
        "/auth/resend-verification-email",
        payload,
        { requiresAuth: false }
    );
    return response;
};



export const fetchUser = async () => {
    const response = await apiClient.get<UserResponse>(
        "/auth/me",
        { requiresAuth: true }
    );
    return response;
};