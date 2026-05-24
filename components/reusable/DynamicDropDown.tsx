'use client'

import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useClickOutside from '@/hooks/common/useClickOutside';


interface DynamicDropDownProps {
    label: string;
    className?: string;
    menuItems: string[];
    onSelect?: (item: string) => void;
}

const DynamicDropDown = ({ label, className, menuItems, onSelect }: DynamicDropDownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useClickOutside(dropdownRef, () => setIsOpen(false))

    const handleSelect = (item: string) => {
        setIsOpen(false)
        if (onSelect) { onSelect(item) };
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-4 py-2 rounded-md ${className}`}
            >
                <span>{label}</span> {/* Use prop directly, no internal state */}
                <ChevronDown className={`w-4 h-4 ml-2 border-none transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white/20 text-whiteColor backdrop-blur-sm rounded-md shadow-lg">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-blackColor text-sm"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DynamicDropDown;