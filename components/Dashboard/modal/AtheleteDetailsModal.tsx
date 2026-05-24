'use client'

import React from 'react'
import ModalWrapper from './ModalWrapper'
import { X, Weight, Repeat, Timer, Flame, Target } from 'lucide-react'
import { getAvatarUrl } from '../shared/UserActivityCard'

interface AthleteModalProps {
    isOpen: boolean
    data: any
    onClose: () => void
}

const AthleteModal = ({ isOpen, data, onClose }: AthleteModalProps) => {
    const athlete = {
        name: data?.athlete_name || 'Sarah Johnson',
        sport: data?.coach_specialization || 'Swimming',
        duration: data?.duration_minutes || 26,
        gender: data?.gender || 'Female',
        level: data?.level || 'Intermediate',
        bio: data?.description || "No description added yet",
        stats: {
            weight: data?.weight || { from: '72kg', to: '68kg' },
            reps: data?.reps || { from: '8', to: '12 Reps' },
            duration: data?.duration || { from: '40s', to: '90s' },
            calories: data?.calories || { from: 'Avg', to: '420' },
        },
        goals: data?.goals || [
            'Lose 2kg in 4 weeks, Improve plank hold to 2 mins',
            'Build core strength and endurance',
            'Enhance lower-body power and stamina.',
        ],
        avatar: data?.athlete_avatar || null,
    }

    const statCards = [
        {
            icon: <Weight size={18} className="text-white" />,
            label: 'Weight',
            from: athlete.stats.weight.from,
            to: athlete.stats.weight.to,
        },
        {
            icon: <Repeat size={18} className="text-white" />,
            label: 'Reps',
            from: athlete.stats.reps.from,
            to: athlete.stats.reps.to,
        },
        {
            icon: <Timer size={18} className="text-white" />,
            label: 'Duration',
            from: athlete.stats.duration.from,
            to: athlete.stats.duration.to,
        },
        {
            icon: <Flame size={18} className="text-white" />,
            label: 'Calories',
            from: athlete.stats.calories.from,
            to: athlete.stats.calories.to,
        },
    ]

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden text-white">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/10">
                    <h2 className="text-base font-semibold text-white">Athlete Details</h2>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition">
                        <X size={15} className="text-gray-400" />
                    </button>
                </div>

                {/* body */}
                <div className="px-6 py-5 space-y-5 max-h-[78vh] overflow-y-auto">

                    {/* Profile */}
                    <div className="flex flex-col items-start gap-4 p-4 rounded-xl bg-secondaryColor">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                {athlete.avatar ? (
                                    <img src={athlete.avatar} alt={athlete.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white text-lg font-bold">
                                        {athlete.name.charAt(0)}
                                    </div>
                                )}


                            </div>

                            <div className=''>
                                <h3 className="text-sm font-semibold text-white">{athlete.name}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{athlete.sport}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {athlete.duration} · {athlete.gender} · {athlete.level}
                                </p>
                            </div>
                        </div>
                        {/* Bio */}
                        <p className="text-xs leading-relaxed">{athlete.bio}</p>
                    </div>



                    {/* Stats */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Athlete's Statistics</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {statCards.map((stat, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 px-4 py-3 rounded-md bg-secondaryColor"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#2a7de1] flex items-center justify-center flex-shrink-0">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-white">{stat.label}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            {stat.from}
                                            <span className="mx-1 text-gray-500">→</span>
                                            {stat.to}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Goals */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Current Goals</h4>
                        <div className="space-y-2">
                            {athlete.goals.map((goal: string, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 px-4 py-2 border-l-2 border-l-blue-500 rounded-md bg-secondaryColor"
                                >
                                    <span className="text-xs text-gray-300 leading-relaxed">{goal}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </ModalWrapper>
    )
}

export default AthleteModal