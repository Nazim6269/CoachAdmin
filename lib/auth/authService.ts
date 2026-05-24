

import { tokenManager } from "@/lib/auth/token";
import type { LoginCredentials, LoginApiResponse, AuthUser } from "@/types/auth";
import { apiClient } from "../api/client";

// ─── Cookie helper (client-side only) ────────────────────────────────────────

function setSessionCookie(maxAgeSeconds: number) {
    if (typeof document === "undefined") return;
    document.cookie = `auth_session=1; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
}

function clearSessionCookie() {
    if (typeof document === "undefined") return;
    document.cookie = "auth_session=; max-age=0; path=/";
}

export const authService = {
    /**
     * POST /api/auth/login
     * Calls backend, saves tokens, returns normalized user object.
     */
    async login(credentials: LoginCredentials): Promise<AuthUser> {
        const response = await apiClient.post<LoginApiResponse>(
            "/auth/login",
            credentials,
            { requiresAuth: false, skip401Redirect: true }
        );

        if (!response.success) {
            throw new Error(response.message ?? "Login failed");
        }

        const user: AuthUser = {
            email: credentials.email,
            role: response.type,
            access_token: response.authorization.access_token,
            refresh_token: response.authorization.refresh_token,
        };

        // 1. Persist tokens to storage
        tokenManager.save({
            access_token: user.access_token,
            refresh_token: user.refresh_token,
            role: user.role as any,
            email: user.email,
        });

        // 2. Set lightweight cookie for middleware (7 days)
        setSessionCookie(7 * 24 * 60 * 60);

        return user;
    },

    /**
     * Logout: clear tokens, cookie, and redirect.
     */
    async logout() {
        try {
            // Optional: Call backend logout endpoint if it exists
            // await apiClient.post("/auth/logout", {});
        } catch (error) {
            console.error("Backend logout failed", error);
        } finally {
            tokenManager.clear();
            clearSessionCookie();
            if (typeof window !== "undefined") {
                window.location.href = "/dashboard/auth/login";
            }
        }
    },


    /**
     * Reconstruct user from stored tokens (used on app boot).
     * Returns null if no valid session exists.
     */
    getStoredUser(): AuthUser | null {
        const access_token = tokenManager.getAccessToken();
        const refresh_token = tokenManager.getRefreshToken();
        const email = tokenManager.getEmail();
        const role = tokenManager.getRole();

        if (!refresh_token || !email || !role) return null;

        return {
            email,
            role,
            access_token: access_token ?? "",
            refresh_token,
        };
    },
};