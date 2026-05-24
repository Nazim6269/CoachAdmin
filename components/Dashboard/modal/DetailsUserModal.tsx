'use client'

import React from 'react'
import ModalWrapper from './ModalWrapper'
import { X, Star, Clock, Award, MessageCircle, Shield } from 'lucide-react'
import Image from 'next/image'
import { useUserDetails } from '@/hooks/user-management/useUserDetails'
import { getAvatarUrl } from '../shared/UserActivityCard'

interface FormModalProps {
    isOpen: boolean
    data: any
    onClose: () => void
}

const DetailsUserModal = ({ isOpen, data, onClose }: FormModalProps) => {
    const { data: fetchData, isLoading, error } = useUserDetails(data?.id);
    console.log(fetchData, "fetch data")
    const avatarUrl = getAvatarUrl(fetchData?.data?.avatar);
    const user = {
        name: fetchData?.data?.name || 'John Doe',
        sport: fetchData?.data?.sports || 'Swimming ',
        rating: fetchData?.data?.rating || 4.9,
        reviews: fetchData?.data?.reviews || 120,
        badges: fetchData?.data?.level || 'Former National-Level',
        bio: fetchData?.data?.description || 'No bio available',
        specialties: fetchData?.data?.specialties || [],
        stats: {
            sessions: fetchData?.data?.statistics?.total_sessions ?? '0',
            experience: fetchData?.data?.statistics?.sessions_completed ?? '0',
        },
        certifications: fetchData?.data?.certifications || ['USMS Certified'],
        avatar: avatarUrl,
        role: fetchData?.data?.role || 'User',
    }

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden text-white">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                    <h2 className="text-base font-semibold text-white">{user?.role} Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-white/10 transition"
                    >
                        <X size={16} className="text-gray-400" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="px-6 pb-6 space-y-5 max-h-[75vh] overflow-y-auto">

                    {/* Profile row */}
                    <div className="flex flex-col items-start gap-4 bg-secondaryColor p-4 rounded-xl">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                {user.avatar ? (
                                    <Image src={user.avatar} alt={user.name} width={50} height={50} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white text-lg font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Name + sport + rating */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-white">{user.name}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{user.sport}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-yellow-400 font-medium">{user.rating}</span>
                                    <span className="text-xs text-gray-500">({user.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            <span
                                className="flex items-center gap-1.5 px-3 py-1 rounded-md  text-xs text-gray-300 bg-primaryColor"
                            >
                                <Shield size={11} className="text-gray-400" />
                                {user.badges}
                            </span>

                        </div>

                        {/* Bio */}
                        <p className="text-xs leading-relaxed">{user.bio}</p>
                    </div>



                    {/* Specialties */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Specialties</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {user.specialties.map((s: string, i: number) => (
                                <span
                                    key={i}
                                    className="w-full text-center px-3 py-1 rounded-md border border-white/10 bg-primaryColor text-xs text-gray-300"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { icon: <Clock size={18} className="text-gray-400" />, value: user.stats.sessions, label: 'Session' },
                            { icon: <Award size={18} className="text-gray-400" />, value: user.stats.experience, label: 'Experience' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/10 bg-primaryColor"
                            >
                                {stat.icon}
                                <span className="text-sm font-bold text-white">{stat.value}</span>
                                <span className="text-[11px] text-gray-500">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Certifications</h4>
                        <div className="space-y-2">
                            {user.certifications.map((cert: string, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-primaryColor"
                                >
                                    <Shield size={13} className="text-gray-400" />
                                    <span className="text-xs text-gray-300">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </ModalWrapper>
    )
}

export default DetailsUserModal