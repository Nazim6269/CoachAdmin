import { apiClient } from "@/lib/api/client";
import { Badge } from "@/types/badge/types";


export const badgeService = {
 
  async getAll(): Promise<Badge[]> {
    try {
      const response = await apiClient.get<{ data: Badge[] }>('/admin/badge-management/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching badges:', error);
      throw error;
    }
  },


  async getById(id: string): Promise<Badge> {
    try {
      const response = await apiClient.get<{ data: Badge }>(`/admin/badge-management/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching badge ${id}:`, error);
      throw error;
    }
  },


  async create(payload: FormData): Promise<Badge> {
    try {
      const response = await apiClient.post<{ data: Badge }>('/admin/badge-management/create', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating badge:', error);
      throw error;
    }
  },

  async update(payload: FormData): Promise<Badge> {
    try {
      const response = await apiClient.post<{ data: Badge }>('/admin/badge-management/create', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating badge:', error);
      throw error;
    }
  },

 
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/admin/badge-management/${id}`);
    } catch (error: any) {
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      console.error(`Error deleting badge ${id}:`, error);
      throw error;
    }
  },
};