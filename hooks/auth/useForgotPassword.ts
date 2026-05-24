"use client";

import { useState } from "react";
import { forgotPasswordService } from "@/service/auth/authResetService";
import { ApiError } from "@/lib/api/client";

interface UseForgotPasswordReturn {
    forgotPassword: (email: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    success: boolean;
    clearError: () => void;
}

export function useForgotPassword(): UseForgotPasswordReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const forgotPassword = async (email: string) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await forgotPasswordService({ email });
            setSuccess(true);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(
                    err.status === 404
                        ? "No account found with this email address."
                        : err.status === 429
                            ? "Too many requests. Please wait a moment and try again."
                            : err.message
                );
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { forgotPassword, isLoading, error, success, clearError: () => setError(null) };
}
