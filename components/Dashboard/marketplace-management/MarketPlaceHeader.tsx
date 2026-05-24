'use client'

import Search from '@/components/reusable/Search';
import DynamicDropDown from '@/components/reusable/DynamicDropDown';
import CustomButton from '@/components/reusable/CustomButton';
import { Plus } from 'lucide-react';

interface Props {
    onAddClick: () => void;
    selectedStatus?: string;
    onStatusChange?: (status: string) => void;
}

export const MarketplaceHeader = ({ onAddClick, selectedStatus = "All Status", onStatusChange }: Props) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <Search placeholder="Search by Coach's Name" />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <DynamicDropDown 
                    label={selectedStatus} 
                    className="w-full sm:w-40 bg-gray-100/10 text-whiteColor" 
                    menuItems={["All Status", "ACTIVE", "INACTIVE", "OUT_OF_STOCK"]} // Added OUT_OF_STOCK
                    onSelect={onStatusChange}
                />
                <CustomButton label="Add Products" className="bg-[#0041C2]/50 text-[#ffffff] px-6 py-5" icon={<Plus />} onClick={onAddClick} />
            </div>
        </div>
    );
};