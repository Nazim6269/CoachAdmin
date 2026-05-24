'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface StatusDropdownProps {
    currentStatus: string;
    productId: string;
    onStatusChange: (id: string, status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK') => Promise<void>;
}

const statusOptions = [
    { value: 'ACTIVE', label: 'ACTIVE', color: 'bg-green-500/20 text-green-700' },
    { value: 'INACTIVE', label: 'INACTIVE', color: 'bg-red-500/20 text-red-700' },
    { value: 'OUT_OF_STOCK', label: 'OUT OF STOCK', color: 'bg-yellow-500/20 text-yellow-700' },
];

export const StatusDropdown = ({ currentStatus, productId, onStatusChange }: StatusDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK') => {
        setLoading(true);
        try {
            await onStatusChange(productId, newStatus);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    };

    const currentOption = statusOptions.find(opt => opt.value === currentStatus);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                className={`inline-flex items-center gap-1 capitalize px-2 py-1 rounded text-xs font-medium ${
                    currentOption?.color || 'bg-gray-500/20 text-gray-700'
                }`}
            >
                {loading ? 'Updating...' : (currentOption?.label || currentStatus)}
                <ChevronDown className="w-4 h-4" />
            </button>

            {isOpen && !loading && (
                <div className="absolute z-20 mt-1 bg-white rounded-md shadow-lg py-1 min-w-[120px]">
                    {statusOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value as any)}
                            className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${option.color} bg-opacity-100`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};