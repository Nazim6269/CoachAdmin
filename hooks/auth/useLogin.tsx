"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth/authService";
import type { LoginCredentials } from "@/types/auth";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { ApiError } from "@/lib/api/client";

interface UseLoginReturn {
    login: (credentials: LoginCredentials) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    clearError: () => void;
}

export function useLogin(): UseLoginReturn {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const user = await authService.login(credentials);
            setUser(user);

            const params = new URLSearchParams(window.location.search);
            const callbackUrl = params.get("callbackUrl") ?? "/";
            router.replace(callbackUrl);
            router.refresh();
        } catch (err) {
            if (err instanceof ApiError) {
                setError(
                    [401, 422].includes(err.status)
                        ? "Invalid email or password. Please try again."
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

    return { login, isLoading, error, clearError: () => setError(null) };
}