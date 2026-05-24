'use client'

import React from 'react';
import SectionWrapper from '../SectionWrapper';
import SessionValidationCard from './SessionValidationCard';
import { useSessionValidations } from '@/hooks/content-management/useSessionValidations';
import Loader from '@/components/reusable/Loader';

const SessionValidationTab = () => {
    const { sessions, loading, error, deleteSession } = useSessionValidations();

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className='space-y-2'>
            {sessions.map((session) => (
                <SessionValidationCard
                    key={session.id}
                    session={session}
                    onDelete={deleteSession}
                />
            ))}
        </div>
    );
};

export default SessionValidationTab;