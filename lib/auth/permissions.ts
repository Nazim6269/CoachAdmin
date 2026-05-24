type Role = "SUPER_ADMIN" | "ADMIN" | "VIEWER";
type Action = "read" | "write" | "delete" | "manage_users";

const PERMISSIONS: Record<Role, Action[]> = {
    SUPER_ADMIN: ["read", "write", "delete", "manage_users"],
    ADMIN: ["read", "write", "delete"],
    VIEWER: ["read"],
};

export function can(role: Role, action: Action): boolean {
    return PERMISSIONS[role]?.includes(action) ?? false;
}
