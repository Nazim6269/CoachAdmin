import React, { useState, useEffect } from 'react'
import ModalWrapper from './ModalWrapper'
import { X, Loader2 } from 'lucide-react'
import SelecteInputField from '@/components/reusable/InputFiled/SelecteInputField'
import ReusableInput from '@/components/reusable/InputFiled/ReusableInput'
import { usePatchBookedUser } from '@/hooks/booking-management/usePatchBookedUser'
import { useBookedUsserDetails } from '@/hooks/booking-management/useBookedUsserDetails'
import { toast } from 'sonner'

interface UpdateBookingModalProps {
    isOpen: boolean
    onClose: () => void
    data: any
}

const UpdateBookingModal = ({ isOpen, onClose, data }: UpdateBookingModalProps) => {
    const { data: bookedDetails, isLoading: isFetching } = useBookedUsserDetails(data?.id);
    const { mutateAsync: updateBooking, isPending: isUpdating } = usePatchBookedUser();

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        duration_minutes: '',
        status: '',
        description: '',
        date: '',
        time: ''
    });

    useEffect(() => {
        if (bookedDetails?.data) {
            const d = bookedDetails.data;
            setFormData({
                title: d.title || (d as any).session_type || '',
                location: d.location || '',
                duration_minutes: d.duration_minutes || (d as any).duration_minutes || '',
                status: d.status || '',
                description: d.description || '',
                date: d.date || d.appointment_date || '',
                time: d.time || d.session_time || ''
            });
        } else if (data) {
            setFormData({
                title: data.session_type || data.title || '',
                location: data.location || '',
                duration_minutes: data.duration_minutes || (data as any).duration_minutes || '',
                status: data.status || '',
                description: data.description || '',
                date: data.date || data.appointment_date || '',
                time: data.time || data.session_time || ''
            });
        }
    }, [bookedDetails?.data, data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        if (!data?.id) return;

        try {
            const payload: any = { ...formData };
            Object.keys(payload).forEach(key => {
                if (payload[key] === '' || payload[key] === null) {
                    delete payload[key];
                }
            });

            console.log(payload, "payload");

            await updateBooking({
                id: data.id,
                data: payload
            });
            toast.success("Booking updated successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to update booking");
            console.error(error);
        }
    }

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden text-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Update Booking</h2>
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
                        <div className="text-center text-gray-400 py-10 flex flex-col items-center gap-3">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            Loading booking data...
                        </div>
                    ) : (
                        <>
                            <ReusableInput
                                label="Session Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter session title"
                            />

                            <ReusableInput
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                disabled
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <ReusableInput
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    disabled
                                />
                                <ReusableInput
                                    label="Time"
                                    name="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ReusableInput
                                    label="Duration (minutes)"
                                    name="duration_minutes"
                                    value={formData.duration_minutes}
                                    onChange={handleChange}
                                    placeholder="e.g. 60"
                                    disabled
                                />

                                <div className="space-y-1.5">
                                    <label className="text-sm text-whiteColor font-medium">Status</label>
                                    <SelecteInputField
                                        value={formData.status}
                                        onValueChange={(val) => handleSelectChange('status', val)}
                                        options={[
                                            { value: "PENDING", label: "Pending" },
                                            { value: "CONFIRMED", label: "Confirmed" },
                                            { value: "COMPLETED", label: "Completed" },
                                            { value: "CANCELLED", label: "Cancelled" }
                                        ]}
                                        placeholder="Select Status"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm text-whiteColor font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter session description"
                                    className="w-full bg-[#252525] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 min-h-[100px] transition-all resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
                                    onClick={onClose}
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className={`px-6 py-2 rounded-lg font-medium text-white transition flex items-center gap-2 ${isUpdating ? "bg-blue-500/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Booking"
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </ModalWrapper>
    )
}

export default UpdateBookingModal