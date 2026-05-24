import { ChevronDown } from "lucide-react";

interface StatusBadgeProps {
    status: string;
}

const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-500/20 text-green-700",
    INACTIVE: "bg-red-500/20 text-red-700",
    OUT_OF_STOCK: "bg-yellow-500/20 text-yellow-700"
};

// Map any possible values to your expected format
const normalizeStatus = (status: string): string => {
    const upperStatus = status?.toUpperCase() || '';

    if (upperStatus.includes('ACTIVE')) return 'ACTIVE';
    if (upperStatus.includes('INACTIVE')) return 'INACTIVE';
    if (upperStatus.includes('OUT') || upperStatus.includes('STOCK')) return 'OUT_OF_STOCK';

    return status; // return as is if no match
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const normalizedStatus = normalizeStatus(status);

    return (
        <span className={`inline-flex items-center gap-1 capitalize px-2 py-1 rounded text-xs font-medium ${statusColors[normalizedStatus] || 'bg-gray-500/20 text-gray-700'}`}>
            {normalizedStatus.replace('_', ' ')}
            <ChevronDown className="w-4 h-4" />
        </span>
    );
};