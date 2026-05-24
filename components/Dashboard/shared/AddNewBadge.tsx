"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/Dashboard/SectionWrapper';
import CustomButton from '@/components/reusable/CustomButton';
import { badgeService } from '@/lib/service/badge/badge.service';
import BadgeForm from '../badge-management/BadgeForm';


import { ArrowLeft } from 'lucide-react';


const AddNewBadge = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        points: '',
        description: '',
        icon: null as File | null,
    });

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = new FormData();
            payload.append('key', formData.title.toLowerCase().replace(/\s+/g, '_'));
            payload.append('title', formData.title);
            payload.append('description', formData.description);
            payload.append('points', formData.points);

            // Default criteria (you can adjust as needed)
            payload.append('criteria', JSON.stringify({
                type: 'count',
                field: 'completed_bookings',
                value: 1
            }));

            if (formData.icon) {
                payload.append('icon', formData.icon);
            }

            await badgeService.create(payload);
            router.push('/dashboard/gamify-management');

        } catch (error) {
            console.error('Failed to create badge:', error);
            alert('Failed to create badge');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SectionWrapper className="flex flex-col gap-6 bg-primaryColor p-4 rounded-xl max-w-md mx-auto">
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back</span>
                </button>
                <div>
                    <h2 className="text-xl font-semibold text-white">Add New Badge</h2>
                    <hr className="mt-3 border-t border-white/10" />
                </div>
            </div>

            <BadgeForm formData={formData} setFormData={setFormData} />

            <CustomButton
                label={loading ? "Creating..." : "Add New Badge"}
                onClick={handleSubmit}
                className="bg-blueColor text-white hover:bg-blueColor/80 disabled:opacity-50"
            />
        </SectionWrapper>
    );
};

export default AddNewBadge;