'use client'

import React from 'react'
import ModalWrapper from './ModalWrapper'
import { X, MapPin, Clock, Calendar, DollarSign, Star, Shield } from 'lucide-react'
import { useBookedUsserDetails } from '@/hooks/booking-management/useBookedUsserDetails'

interface SessionBookingModalProps {
    isOpen: boolean
    data: any
    onClose: () => void
}


const SessionBookingModal = ({ isOpen, data, onClose }: SessionBookingModalProps) => {
    const { data: bookedUserDetails } = useBookedUsserDetails(data?.id)

    const { title, location, duration, price, coach, coach_specialization, description, appointment_date, date_time, coach_availability } = bookedUserDetails?.data ?? {}

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
            <div className="bg-[#1a1a1a] rounded-2xl overflow-y-auto max-h-[68vh] text-white">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/10">
                    <h2 className="text-base font-semibold text-white">Session Booking Details</h2>
                </div>

                {/* Scrollable body */}
                <div className="px-6 py-5 space-y-5 max-h-[78vh] overflow-y-auto">

                    {/* Session Card */}
                    <div className="p-4 rounded-xl bg-[#252525] space-y-3">
                        {/* Session title row */}
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2a7de1] flex items-center justify-center flex-shrink-0">
                                {/* Swimming icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12h20" /><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
                                    <circle cx="12" cy="7" r="2" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-white leading-snug">{title || ''}</h3>
                        </div>

                        {/* Meta grid */}
                        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <MapPin size={13} className="text-gray-500 flex-shrink-0" />
                                <span>{location || ''}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock size={13} className="text-gray-500 flex-shrink-0" />
                                <span>{duration || ''}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Calendar size={13} className="text-gray-500 flex-shrink-0" />
                                <span>{date_time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                {/* <DollarSign size={13} className="text-gray-500 flex-shrink-0" /> */}
                                <span>{price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Coach Card */}
                    <div className="p-4 rounded-xl bg-[#252525] space-y-3">
                        {/* Coach profile */}
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-600">
                                {coach?.avatar ? (
                                    <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white text-base font-bold">
                                        {coach?.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">{coach?.name}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{coach_specialization}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-gray-500">{coach?.rating_display}</span>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {coach?.specialties_array?.map((specialty: string, i: number) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300"
                                >
                                    <Shield size={10} className="text-gray-400" />
                                    {specialty}
                                </span>
                            ))}
                        </div>

                        {/* Bio */}
                        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                    </div>

                    {/* Upcoming Availability */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Upcoming Availability</h4>
                        <div className="space-y-2">
                            {coach_availability?.available_days.map((day: string, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5"
                                >
                                    <span className="text-xs font-medium text-white">{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </ModalWrapper>
    )
}

export default SessionBookingModal