import { useState, useEffect, useCallback } from 'react';
import { contentService } from '@/lib/service/contentManagement/content.service';
import { SessionValidation, ApiError } from '@/types/contentManagement/types';

export const useSessionValidations = () => {
    const [sessions, setSessions] = useState<SessionValidation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await contentService.getAllSessionValidations();
            if (response.success) {
                setSessions(response.data);
            }
        } catch (err) {
            setError((err as ApiError).message);
        } finally {
            setLoading(false);
        }
    }, []);

    const validateSession = useCallback(async (id: string) => {
        try {
            const response = await contentService.validateSession(id);
            if (response.success) {
                setSessions(prev =>
                    prev.map(session =>
                        session.id === id ? { ...session, is_validated: true } : session
                    )
                );
                return true;
            }
            return false;
        } catch (err) {
            setError((err as ApiError).message);
            return false;
        }
    }, []);

    const deleteSession = useCallback(async (id: string) => {
        if (!confirm('Are you sure you want to delete this session?')) return false;

        try {
            const response = await contentService.deleteSession(id);
            if (response.success) {
                setSessions(prev => prev.filter(session => session.id !== id));
                return true;
            }
            return false;
        } catch (err) {
            setError((err as ApiError).message);
            return false;
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    return {
        sessions,
        loading,
        error,
        fetchSessions,
        validateSession,
        deleteSession
    };
};