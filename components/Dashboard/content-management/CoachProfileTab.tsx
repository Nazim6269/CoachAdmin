'use client'

import React from 'react';
import EyeOnIcon from '@/icons/EyeOnIcon';
import WriteIcon from '@/icons/WriteIcon';
import { DeleteIcon } from 'lucide-react';
import Image from 'next/image';
import { useCoaches } from '@/hooks/content-management/useCoaches';
import Loader from '@/components/reusable/Loader';

const CoachProfileTab = () => {
    const { coaches, loading, error, deleteCoach } = useCoaches();

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="space-y-4">
            {coaches.map((coach) => (
                <div
                    key={coach.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primaryColor border border-gray-800 p-4 rounded-xl text-gray-100 shadow-lg transition"
                >
                    {/* left */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-12 sm:h-12 bg-gray-700 rounded-md flex-shrink-0 flex items-center justify-center text-sm text-gray-300 overflow-hidden">
                            {coach.avatar ? (
                                <Image
                                    src={coach.avatar}
                                    alt={coach.name}
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-xs">No img</span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{coach.name}</h2>
                            <p className="text-sm text-gray-400 break-words">{coach.email}</p>

                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-1 text-sm">
                                <span className={`px-2 py-0.5 rounded-full ${coach.status === 'Active' ? 'bg-green-600/20 text-green-400' :
                                    coach.status === 'Inactive' ? 'bg-red-600/20 text-red-400' :
                                        'bg-yellow-400/20 text-yellow-600'
                                    }`}>
                                    {coach.status}
                                </span>
                                <p className="text-blueColor bg-blueColor/20 px-2 py-0.5 rounded-full">
                                    Session: {coach.session_count}
                                </p>
                                {coach.coach_profile.is_verified && (
                                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* right actions */}
                    <div className="flex mt-2 sm:mt-0 items-center gap-3 text-gray-400 flex-shrink-0">
                        <button className="hover:text-blue-400 transition">
                            <EyeOnIcon className="w-7 h-7 border border-secondaryColor rounded-md p-1" />
                        </button>
                        <button className="hover:text-yellow-400 transition">
                            <WriteIcon className="w-7 h-7 border border-secondaryColor rounded-md p-1" />
                        </button>
                        <button
                            onClick={() => deleteCoach(coach.id)}
                            className="hover:text-red-400 transition"
                        >
                            <DeleteIcon className="w-7 h-7 border border-secondaryColor rounded-md p-1" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoachProfileTab;