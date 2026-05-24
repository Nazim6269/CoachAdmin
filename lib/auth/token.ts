// ============================================================
// lib/auth/token.ts
// ============================================================
const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_ROLE_KEY = "auth_user_role";
const USER_EMAIL_KEY = "auth_user_email";

// ─── Client-side helpers (sessionStorage for tab-scoped memory) ───────────────

export const tokenManager = {
    /**
     * Save tokens after successful login.
     * access_token  → sessionStorage (cleared on tab close)
     * refresh_token → localStorage   (persists for silent refresh)
     * role/email    → localStorage   (non-sensitive, for UI)
     */
    save(params: {
        access_token: string;
        refresh_token: string;
        role: string;
        email: string;
    }) {
        if (typeof window === "undefined") return;

        sessionStorage.setItem(ACCESS_TOKEN_KEY, params.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, params.refresh_token);
        localStorage.setItem(USER_ROLE_KEY, params.role);
        localStorage.setItem(USER_EMAIL_KEY, params.email);
    },

    getAccessToken(): string | null {
        if (typeof window === "undefined") return null;
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    },

    getRefreshToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    getRole(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(USER_ROLE_KEY);
    },

    getEmail(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(USER_EMAIL_KEY);
    },

    isAuthenticated(): boolean {
        if (typeof window === "undefined") return false;
        return !!(
            sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
            localStorage.getItem(REFRESH_TOKEN_KEY)
        );
    },

    clear() {
        if (typeof window === "undefined") return;
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_ROLE_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
    },
};
