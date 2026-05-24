import { CreateProductPayload, ProductResponse, ProductsListResponse, UpdateProductPayload, UpdateStatusPayload } from '@/types/marketplace/types';
import { apiClient } from '../../api/client';

const BASE = '/marketplace-management';


export const productService = {
  // Get all products with pagination
getAllProducts: (page = 1, limit = 10, status?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    // Use the status field directly since backend has it
    if (status && status !== 'All Status') {
      params.append('status', status); // Just pass the status as is
    }

    const url = `${BASE}/products?${params.toString()}`;
    console.log('🔍 FULL URL:', url); // Check this in browser console
  console.log('🔍 Status being sent:', status); // Check what status is being passed
    return apiClient.get<ProductsListResponse>(url);
  },

  // Get single product
  getProductById: (id: string) => 
    apiClient.get<ProductResponse>(`${BASE}/product/${id}`),

  // Create product with JSON
  createProduct: (payload: CreateProductPayload) => {
    return apiClient.post<ProductResponse>(`${BASE}/product/create`, payload)
  },

  // For file uploads with FormData
  createProductWithImages: (formData: FormData) => {
   
    return apiClient.post<ProductResponse>(`${BASE}/product/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update product
  updateProduct: (id: string, payload: UpdateProductPayload) => 
    apiClient.patch<ProductResponse>(`${BASE}/product/${id}`, payload),

  // Update status only
  updateProductStatus: (id: string, payload: UpdateStatusPayload) => 
    apiClient.patch<ProductResponse>(`${BASE}/product/${id}/update/status`, payload),

  // Delete product
  deleteProduct: (id: string) => 
    apiClient.delete<{ success: boolean; message: string }>(`${BASE}/product/${id}`),
}