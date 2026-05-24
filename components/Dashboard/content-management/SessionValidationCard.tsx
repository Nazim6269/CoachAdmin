'use client'

import EyeOnIcon from '@/icons/EyeOnIcon';
import ReversibaleIcon from '@/icons/ReversibaleIcon';
import { DeleteIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { SessionValidation } from '@/types/contentManagement/types';

interface Props {
    session: SessionValidation;
    onDelete: (id: string) => Promise<boolean>;
}

const SessionValidationCard = ({ session, onDelete }: Props) => {
    const statusColors = {
        CONFIRMED: 'text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full',
        COMPLETED: 'text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full',
        CANCELLED: 'text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full',
        PENDING: 'text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full'
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-primaryColor border border-primaryColor/20 p-4 rounded-xl text-gray-200 gap-4">
            {/* left div - Users */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap flex-1 min-w-0">
                {/* From user (Athlete) */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-xs">
                        {session.athlete.avatar ? (
                            <Image
                                src={session.athlete.avatar}
                                alt={session.athlete.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <span>Img</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold truncate">{session.athlete.name}</h2>
                        <p className="text-xs text-gray-400 truncate">{session.athlete.role}</p>
                    </div>
                </div>

                <ReversibaleIcon className="text-gray-400 w-5 h-5 flex-shrink-0" />

                {/* To user (Coach) */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-xs">
                        {session.coach.avatar ? (
                            <Image
                                src={session.coach.avatar}
                                alt={session.coach.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <span>Img</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold truncate">{session.coach.name}</h2>
                        <p className="text-xs text-gray-400 truncate">{session.coach.role}</p>
                    </div>
                </div>
            </div>

            {/* middle + right - FIXED ALIGNMENT */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 flex-shrink-0 w-full sm:w-auto">
                {/* middle div - Session info */}
                <div className="flex flex-col text-sm text-gray-300  p-2 rounded-lg w-full sm:w-auto">
                    <div className="flex justify-end gap-2">
                        <span className="font-medium">{session.session.date}</span>
                        <span className="text-gray-500">•</span>
                        <span className="font-medium">{session.session.time}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2 mt-1">
                        {/* <span className="text-xs text-gray-400 bg-secondaryColor/30 px-2 py-0.5 rounded">
                            {session.id.slice(-8)}
                        </span> */}
                        <span className={`text-xs ${statusColors[session.status]}`}>
                            {session.status}
                        </span>
                        {session.is_validated && (
                            <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full flex gap-1 justify-end items-center">
                                <span>✓</span> Validated
                            </span>
                        )}
                    </div>
                </div>

                {/* right div - Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                    <button className="hover:bg-blue-500/10 p-1 rounded-md transition">
                        <EyeOnIcon className="w-7 h-7 border border-gray-700 rounded-md p-1.5 hover:border-blue-500 hover:text-blue-400 transition" />
                    </button>
                    <button
                        onClick={() => onDelete(session.id)}
                        className="hover:bg-red-500/10 p-1 rounded-md transition"
                    >
                        <DeleteIcon className="w-7 h-7 border border-gray-700 rounded-md p-1.5 hover:border-red-500 hover:text-red-400 transition" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionValidationCard;