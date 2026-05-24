'use client'

import React from 'react';
import SectionWrapper from '../SectionWrapper';
import SessionValidationCard from './SessionValidationCard';
import { useSessionValidations } from '@/hooks/content-management/useSessionValidations';
import Loader from '@/components/reusable/Loader';
import { DEMO_SESSION_VALIDATIONS } from '@/public/demoData/DemoData';

const SessionValidationTab = () => {
    const { sessions, loading, error, deleteSession } = useSessionValidations();
    const displaySessions = !loading && (error || !sessions.length) ? DEMO_SESSION_VALIDATIONS : sessions;

    if (loading) return <Loader />;

    return (
        <div className='space-y-2'>
            {displaySessions.map((session) => (
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