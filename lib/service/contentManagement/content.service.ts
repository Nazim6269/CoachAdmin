import { apiClient } from '../../api/client';
import { 
  CoachesResponse, 
  SessionValidationResponse,
  BioUpdateRequest,
  ApiError 
} from '@/types/contentManagement/types';
import { mockBioRequests } from './mockData/mockData';

const BASE = '/admin/content';

export const contentService = {
  // Get all coaches
  getAllCoaches: () => 
    apiClient.get<CoachesResponse>(`${BASE}/coaches`),

  // Get coach by ID
  getCoachById: (id: string) => 
    apiClient.get<{ success: boolean; data: any }>(`${BASE}/coaches/${id}`),

  // Update coach status
  updateCoachStatus: (id: string, status: 'Active' | 'Inactive' | 'Pending') => 
    apiClient.patch<{ success: boolean; message: string }>(
      `${BASE}/coaches/${id}/status`, 
      { status }
    ),

  // Delete coach
  deleteCoach: (id: string) => 
    apiClient.delete<{ success: boolean; message: string }>(
      `${BASE}/coaches/${id}`
    ),

  // Get all session validations
  getAllSessionValidations: () => 
    apiClient.get<SessionValidationResponse>(`${BASE}/session-validation`),

  // Validate session
  validateSession: (id: string) => 
    apiClient.patch<{ success: boolean; message: string }>(
      `${BASE}/session-validation/${id}/validate`,
      {}
    ),

  // Delete session
  deleteSession: (id: string) => 
    apiClient.delete<{ success: boolean; message: string }>(
      `${BASE}/session-validation/${id}`
    ),

  // Get bio update requests - FIXED to match BioUpdateRequest type
  getBioUpdateRequests: () => 
  Promise.resolve({
    success: true,
    data: mockBioRequests
  }),

  // Approve bio update
  approveBioUpdate: (id: number) => 
    apiClient.patch<{ success: boolean; message: string }>(
      `${BASE}/bio-requests/${id}/approve`,
      {}
    ),

  // Reject bio update
  rejectBioUpdate: (id: number) => 
    apiClient.delete<{ success: boolean; message: string }>(
      `${BASE}/bio-requests/${id}`
    ),
};