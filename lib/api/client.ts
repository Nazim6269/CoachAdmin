

import { tokenManager } from "@/lib/auth/token";
import { Fetch } from "../Fetch";

// ─── Error class ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public data?: unknown
    ) {
        super(message);
        this.name = "ApiError";
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build Authorization header only when auth is required and token exists. */
function buildAuthHeader(requiresAuth: boolean): Record<string, string> {
    if (!requiresAuth) return {};
    const token = tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function resolveData<T>(response: any): T {
    if (response && typeof response === "object" && "data" in response) {
        return response.data as T;
    }
    return response as T;
}

function resolveStatus(response: any): number {
    if (response && typeof response === "object" && "status" in response) {
        return response.status as number;
    }
    return 200;
}

function handle401(): never {
    tokenManager.clear();
    if (typeof window !== "undefined") {
        document.cookie = "auth_session=; max-age=0; path=/";
        window.location.href = "/dashboard/auth/login?reason=session_expired";
    }
    throw new ApiError(401, "Session expired. Please log in again.");
}

// ─── Request wrapper ──────────────────────────────────────────────────────────

async function handleRequest<T>(fetcher: () => Promise<any>, opts: RequestOptions = {}): Promise<T> {
    try {
        const response = await fetcher();

        if (resolveStatus(response) === 401 && !opts.skip401Redirect) handle401();

        return resolveData<T>(response);
    } catch (err: any) {
        if (err?.response) {
            const status = err.response.status as number;
            const message = err.response.data?.message ?? `Request failed with status ${status}`;

            if (status === 401 && !opts.skip401Redirect) handle401();

            throw new ApiError(status, message, err.response.data);
        }

        if (err instanceof ApiError) throw err;

        throw new ApiError(0, err?.message ?? "Network error. Please check your connection.");
    }
}

// ─── Request options ──────────────────────────────────────────────────────────

interface RequestOptions {
    requiresAuth?: boolean;
    headers?: Record<string, string>;
    skip401Redirect?: boolean;
}

/** Merge auth header with any extra caller-supplied headers. */
function buildHeader(opts: RequestOptions) {
    const { requiresAuth = true, headers = {} } = opts;
    return { headers: { ...buildAuthHeader(requiresAuth), ...headers } };
}




// ─── Public API client ────────────────────────────────────────────────────────

export const apiClient = {
    get<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
        return handleRequest<T>(() => Fetch.get(endpoint, buildHeader(opts)), opts);
    },

    post<T>(endpoint: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
        return handleRequest<T>(() => Fetch.post(endpoint, body, buildHeader(opts)), opts);
    },

    put<T>(endpoint: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
        return handleRequest<T>(() => Fetch.put(endpoint, body, buildHeader(opts)), opts);
    },

    patch<T>(endpoint: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
        return handleRequest<T>(() => Fetch.patch(endpoint, body, buildHeader(opts)), opts);
    },

    delete<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
        return handleRequest<T>(() => Fetch.delete(endpoint, buildHeader(opts)), opts);
    },

    async download(endpoint: string, opts: RequestOptions = {}): Promise<Blob> {
        try {
            const blob = await Fetch.getBlob(endpoint, buildHeader(opts));
            if (!blob) {
                throw new ApiError(0, "Failed to download file");
            }
            return blob;
        } catch (err: any) {
            if (err?.response) {
                const status = err.response.status as number;
                const message = err.response.data?.message ?? `Request failed with status ${status}`;

                if (status === 401) handle401();

                throw new ApiError(status, message, err.response.data);
            }

            if (err instanceof ApiError) throw err;

            throw new ApiError(0, err?.message ?? "Network error. Please check your connection.");
        }
    },
};