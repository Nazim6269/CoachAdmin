'use client'

import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { X } from 'lucide-react'
import ReusableInput from '@/components/reusable/InputFiled/ReusableInput'
import SelecteInputField from '@/components/reusable/InputFiled/SelecteInputField'
import { useUserDetails } from '@/hooks/user-management/useUserDetails'
import { usePatchUser } from '@/hooks/user-management/usePatchUser'
import { toast } from 'react-toastify'

interface UpdateUserModalProps {
    isOpen: boolean
    userId: string | null
    onClose: () => void
}

const UpdateUserModal = ({ isOpen, userId, onClose }: UpdateUserModalProps) => {
    const { data: fetchUser, isLoading: isFetching } = useUserDetails(userId || '');
    const { mutateAsync: patchUser, isPending: isUpdating } = usePatchUser();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        status: '',
        bio: '',
        location: '',
        address: '',
        gender: '',
        age: ''
    });

    useEffect(() => {
        if (fetchUser?.data) {
            setFormData({
                name: fetchUser.data.name || '',
                email: fetchUser.data.email || '',
                phone_number: fetchUser.data.phone_number || '',
                status: fetchUser.data.status ? fetchUser.data.status.toLowerCase() : '',
                bio: fetchUser.data.bio || fetchUser.data.description || '',
                location: fetchUser.data.location || '',
                address: fetchUser.data.address || '',
                gender: fetchUser.data.gender || '',
                age: fetchUser.data.age ? String(fetchUser.data.age) : ''
            });
        }
    }, [fetchUser?.data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        try {
            const payload: any = { ...formData };
            if (payload.age) {
                payload.age = parseInt(payload.age);
            } else {
                delete payload.age;
            }

            Object.keys(payload).forEach(key => {
                if (payload[key] === '') {
                    delete payload[key];
                }
            });

            await patchUser({ id: userId, data: payload });
            toast.success("User updated successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to update user");
            console.error(error);
        }
    }

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden text-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Update User</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-white/10 transition"
                    >
                        <X size={16} className="text-gray-400" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 max-h-[75vh] overflow-y-auto">
                    {isFetching ? (
                        <div className="text-center text-gray-400 py-10">Loading user data...</div>
                    ) : (
                        <>
                            <ReusableInput
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                            />
                            <ReusableInput
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                            <ReusableInput
                                label="Phone Number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />

                            <div className="space-y-1.5">
                                <label className="text-sm text-whiteColor font-medium">Status</label>
                                <SelecteInputField
                                    value={formData.status}
                                    onValueChange={(val) => handleSelectChange('status', val)}
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'blocked', label: 'Blocked' }
                                    ]}
                                    placeholder="Select Status"
                                />
                            </div>

                            <ReusableInput
                                label="Bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Enter bio"
                            />
                            <ReusableInput
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                            />
                            <ReusableInput
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm text-whiteColor font-medium">Gender</label>
                                    <SelecteInputField
                                        value={formData.gender}
                                        onValueChange={(val) => handleSelectChange('gender', val)}
                                        options={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' },
                                            { value: 'other', label: 'Other' }
                                        ]}
                                        placeholder="Select Gender"
                                    />
                                </div>
                                <ReusableInput
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter age"
                                    min={1}
                                    max={150}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md font-medium text-white bg-gray-600 hover:bg-gray-700 transition"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className={`px-4 py-2 rounded-md font-medium text-white ${isUpdating ? "bg-blue-500/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition`}
                                >
                                    {isUpdating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </ModalWrapper>
    )
}

export default UpdateUserModal
