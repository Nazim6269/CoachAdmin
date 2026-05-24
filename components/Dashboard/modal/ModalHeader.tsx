import { X } from "lucide-react";
import React from "react";

// Header with optional icon
const ModalHeader = ({ title, subtitle, icon, onClose, className }: {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    onClose?: () => void;
    className?: string;
}) => (
    <div className={`px-6 pt-6 pb-4 border-gray-100 dark:border-white/10 ${className}`}>
        {icon && <div className="mb-3">{icon}</div>}
        <h2 className="text-lg mb-2 font-semibold text-whiteColor dark:text-white">{title}</h2>
        <div className="w-full h-px bg-secondaryColor"></div>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        {onClose && (
            <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 transition"
            >
                <X size={16} className="text-gray-400" />
            </button>
        )}
    </div>
);


export default ModalHeader;
