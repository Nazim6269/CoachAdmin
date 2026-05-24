import { create } from "zustand";
import { authService } from "@/lib/auth/authService";
import type { AuthUser, AuthState } from "@/types/auth";

interface AuthStore extends AuthState {
    setUser: (user: AuthUser | null) => void;
    logout: () => Promise<void>;
    initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
        }),

    logout: async () => {
        await authService.logout();
        set({ user: null, isAuthenticated: false, isLoading: false });
    },

    initialize: () => {
        const storedUser = authService.getStoredUser();
        set({
            user: storedUser,
            isAuthenticated: !!storedUser,
            isLoading: false,
        });
    },
}));
