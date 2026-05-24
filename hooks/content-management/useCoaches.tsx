import { useState, useEffect, useCallback } from 'react';
import { Coach, ApiError } from '@/types/contentManagement/types';
import { contentService } from '@/lib/service/contentManagement/content.service';

export const useCoaches = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCoaches = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await contentService.getAllCoaches();
            if (response.success) {
                setCoaches(response.data);
            }
        } catch (err) {
            setError((err as ApiError).message);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateCoachStatus = useCallback(async (id: string, status: 'Active' | 'Inactive' | 'Pending') => {
        try {
            const response = await contentService.updateCoachStatus(id, status);
            if (response.success) {
                // Update local state
                setCoaches(prev =>
                    prev.map(coach =>
                        coach.id === id ? { ...coach, status } : coach
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

    const deleteCoach = useCallback(async (id: string) => {
        if (!confirm('Are you sure you want to delete this coach?')) return false;

        try {
            const response = await contentService.deleteCoach(id);
            if (response.success) {
                setCoaches(prev => prev.filter(coach => coach.id !== id));
                return true;
            }
            return false;
        } catch (err) {
            setError((err as ApiError).message);
            return false;
        }
    }, []);

    useEffect(() => {
        fetchCoaches();
    }, [fetchCoaches]);

    return {
        coaches,
        loading,
        error,
        fetchCoaches,
        updateCoachStatus,
        deleteCoach
    };
};