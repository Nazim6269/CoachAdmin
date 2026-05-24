"use client";

import FormField from '@/components/reusable/FormField';
import FormDropdown from '@/components/reusable/FormDropDown';

interface Props {
    criteria: {
        type: string;
        field: string;
        value: string;
    };
    setCriteria: React.Dispatch<React.SetStateAction<any>>;
}

const CriteriaForm = ({ criteria, setCriteria }: Props) => {
    const updateCriteria = (field: string, value: string) => {
        setCriteria((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-white font-medium">Earning Criteria</h3>

            <div className="flex gap-4">
                <FormField label="Type">
                    <FormDropdown
                        label="Select Type"
                        options={['count', 'exists']}
                        value={criteria.type}
                        onChange={(val) => updateCriteria('type', val)}
                    />
                </FormField>

                <FormField label="Field">
                    <FormDropdown
                        label="Select Field"
                        options={['completed_bookings', 'goals']}
                        value={criteria.field}
                        onChange={(val) => updateCriteria('field', val)}
                    />
                </FormField>

                {criteria.type === 'count' && (
                    <FormField label="Value">
                        <input
                            type="number"
                            value={criteria.value}
                            onChange={(e) => updateCriteria('value', e.target.value)}
                            placeholder="e.g., 1"
                            className="w-full p-2 rounded bg-white/10 text-white"
                        />
                    </FormField>
                )}
            </div>
        </div>
    );
};

export default CriteriaForm;