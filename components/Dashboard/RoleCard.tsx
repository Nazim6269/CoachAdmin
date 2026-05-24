import { cn } from "@/lib/utils";
import Link from "next/link";

interface RoleCardProps {
    title: string;
    description: string;
    href: string;
    isActive?: boolean;
    className?: string;
}

export function RoleCard({
    title,
    description,
    href,

    isActive = false,
    className,
}: RoleCardProps) {
    return (
        <Link href={href} className="group block w-full">
            <div
                className={cn(
                    "relative flex flex-col items-start gap-3 rounded-2xl border p-6 cursor-pointer",
                    "transition-all duration-300 ease-out",
                    "bg-white/[0.03] border-white/10",
                    "hover:bg-white/[0.07] hover:border-blue-500/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]",
                    isActive && [
                        "bg-white/[0.05] border-blue-500",
                        "shadow-[0_0_0_1px_rgba(59,130,246,0.5),0_0_32px_rgba(59,130,246,0.15)]",
                    ],
                    className
                )}
            >
                {/* Subtle top-edge glow when active */}
                {isActive && (
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full" />
                )}

                {/* Text */}
                <div className="space-y-1.5">
                    <h3
                        className={cn(
                            "text-center font-semibold tracking-tight text-white/80",
                            "transition-colors duration-300 group-hover:text-white",
                            isActive && "text-white"
                        )}
                    >
                        {title}
                    </h3>
                    <p className="text-sm text-center leading-relaxed text-white/40 group-hover:text-white/50 transition-colors duration-300">
                        {description}
                    </p>
                </div>

            </div>
        </Link>
    );
}