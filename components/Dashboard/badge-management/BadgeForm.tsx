"use client";

import FormField from '@/components/reusable/FormField';
import GamifyFirst from '@/icons/GamifyFirst';

interface Props {
    formData: {
        title: string;
        points: string;
        description: string;
        icon: File | null;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BadgeForm = ({ formData, setFormData }: Props) => {
    const updateField = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            {/* Icon Preview */}
            <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                    {formData.icon ? (
                        <img
                            src={URL.createObjectURL(formData.icon)}
                            alt="Preview"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <GamifyFirst className="w-12 h-12 text-white/50" />
                    )}
                </div>
            </div>

            {/* Icon Upload */}
            <FormField label="Badge Icon">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateField('icon', e.target.files?.[0] || null)}
                    className="w-full p-2 rounded bg-white/10 text-white text-sm"
                />
            </FormField>

            {/* Title */}
            <FormField label="Badge Title">
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., First Session"
                    className="w-full p-2 rounded bg-white/10 text-white"
                />
            </FormField>

            {/* Points */}
            <FormField label="Points">
                <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => updateField('points', e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full p-2 rounded bg-white/10 text-white"
                />
            </FormField>

            {/* Description */}
            <FormField label="Details">
                <textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Describe how to earn this badge"
                    className="w-full p-2 rounded bg-white/10 text-white"
                    rows={3}
                />
            </FormField>
        </div>
    );
};

export default BadgeForm;