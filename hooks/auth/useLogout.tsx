import { authService } from "@/lib/auth/authService";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";

interface UseLogoutReturn {
    logout: () => void;
    isPending: boolean;
    error: string | null;
}


export function useLogout(): UseLogoutReturn {
    const contextLogout = useAuthStore((state) => state.logout);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await contextLogout();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred during logout.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        logout,
        isPending: isLoading,
        error,
    };
}