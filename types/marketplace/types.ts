export interface Product {
  id: string;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  productName: string;
  categoryId: string | null;
  price: number;
  stockQuantity: number;
  brandName: string;
  discount: number;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
  hasImages: boolean;
}

export interface ProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Product;
}

export interface ProductsListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
      has_next_page: boolean;
      has_previous_page: boolean;
    };
  };
}


export interface CreateProductFormData {
  productName: string;
  price: string | number;
  stockQuantity: string | number;
  brandName: string;
  discount: string | number;
  description: string;
  isActive: string | boolean;
  images?: File[]; // Files for upload
}
export interface CreateProductPayload {
  productName: string;
  price: number;
  stockQuantity: number;
  brandName: string;
  discount: number;
  description: string;
  isActive: boolean;
  images?: string[];
}

export interface UpdateProductPayload {
  productName?: string;
  categoryId?: string;
  price?: number;
  stockQuantity?: number;
  brandName?: string;
  discount?: number;
  description?: string;
  isActive?: boolean;
}

export interface UpdateStatusPayload {
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
}