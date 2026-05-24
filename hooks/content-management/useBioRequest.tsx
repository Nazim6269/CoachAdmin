import { useState, useEffect, useCallback } from 'react';
import { contentService } from '@/lib/service/contentManagement/content.service';
import { BioUpdateRequest, ApiError } from '@/types/contentManagement/types';

export const useBioRequests = () => {
    const [requests, setRequests] = useState<BioUpdateRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await contentService.getBioUpdateRequests();
            if (response.success) {
                setRequests(response.data);
            }
        } catch (err) {
            setError((err as ApiError).message);
        } finally {
            setLoading(false);
        }
    }, []);

    const approveRequest = useCallback(async (id: number) => {
        try {
            const response = await contentService.approveBioUpdate(id);
            if (response.success) {
                setRequests(prev => prev.filter(req => req.id !== id));
                return true;
            }
            return false;
        } catch (err) {
            setError((err as ApiError).message);
            return false;
        }
    }, []);

    const rejectRequest = useCallback(async (id: number) => {
        try {
            const response = await contentService.rejectBioUpdate(id);
            if (response.success) {
                setRequests(prev => prev.filter(req => req.id !== id));
                return true;
            }
            return false;
        } catch (err) {
            setError((err as ApiError).message);
            return false;
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    return {
        requests,
        loading,
        error,
        fetchRequests,
        approveRequest,
        rejectRequest
    };
};