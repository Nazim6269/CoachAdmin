import { useState } from 'react';
import { productService } from '@/lib/service/marketplace/marketplace.service';
import { CreateProductPayload, UpdateProductPayload, ApiError } from '@/types/marketplace/types';

export const useProductMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For JSON payload
  const createProduct = async (payload: CreateProductPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.createProduct(payload);
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = (err as ApiError).message || 'Failed to create product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // For FormData with file uploads
  const createProductWithImages = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.createProductWithImages(formData);
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = (err as ApiError).message || 'Failed to create product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, payload: UpdateProductPayload) => {
    setLoading(true);
    try {
      const res = await productService.updateProduct(id, payload);
      return { success: true, data: res.data };
    } catch (err) {
      setError((err as ApiError).message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await productService.deleteProduct(id);
      return { success: true };
    } catch (err) {
      setError((err as ApiError).message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK') => {
    setLoading(true);
    try {
        // Send both status and isActive to backend
        const payload = { 
            status, 
            isActive: status === 'ACTIVE' 
        };
        const res = await productService.updateProductStatus(id, payload);
        return { success: true, data: res.data };
    } catch (err) {
        setError((err as ApiError).message);
        return { success: false };
    } finally {
        setLoading(false);
    }
};
  
  return { 
    createProduct,
    createProductWithImages,
    updateProduct, 
    deleteProduct, 
    updateStatus,
    loading, 
    error 
  };
};