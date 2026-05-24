import { RoleCard } from "@/components/Dashboard/RoleCard";
import Image from "next/image";

// ─── Role config (extend here as needed) ─────────────────────────────────────
const ROLES = [
    {
        key: "athlete",
        title: "Athlete Dashboard",
        description: "Book sessions, manage appointments, and track your progress.",
        href: "#",

    },
    {
        key: "coach",
        title: "Coach Dashboard",
        description: "Manage sessions, view earnings, and track client progress.",
        href: "#",

    },
    {
        key: "admin",
        title: "Admin Dashboard",
        description: "Manage users, oversee platform operations, and view analytics.",
        href: "/",

    },
] as const;

export default function SelectRolePage() {
    return (
        <main
            className="
        relative min-h-screen w-full overflow-hidden
        bg-[#0a0a0a]
        flex flex-col items-center justify-center
        px-4 py-16
      "
        >
            {/* ── Background atmosphere ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Radial center glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px]" />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                {/* Top-edge glow line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-3xl">

                {/* Logo */}
                <Image alt="site logo" src={"/site_logo.png"} width={220} height={37} />

                {/* Heading block */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Coaching Platform Dashboard
                    </h1>
                    <p className="text-sm text-white/40 font-medium tracking-wide">
                        Select your role to access the dashboard
                    </p>
                </div>

                {/* Role cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    {ROLES.map((role, i) => (
                        <RoleCard
                            key={role.key}
                            title={role.title}
                            description={role.description}
                            href={role.href}
                            className="bg-secondaryColor"
                            isActive={i === 0}
                        />
                    ))}
                </div>

                {/* Footer note */}
                <p className="text-xs text-white/20 tracking-wide">
                    Access is restricted to your assigned role(s).
                </p>
            </div>
        </main>
    );
}