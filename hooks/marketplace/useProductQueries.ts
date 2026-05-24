// import { productService } from '@/lib/service/marketplace/marketplace.service';
// import { Product, ApiError } from '@/types/marketplace/types';
// import { useState, useCallback } from 'react';
// import toast from 'react-hot-toast';

// export const useProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [pagination, setPagination] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);


//   // Updated to accept filters object
// const fetchProducts = useCallback(async (page = 1, limit = 10, status?: string) => {
//   setLoading(true);
//   setError(null);
//   try {
//     const res = await productService.getAllProducts(page, limit, status);
    
//     if (res.success) {
//       let filteredProducts = res.data.data;
      
    
//       if (status === 'ACTIVE') {
        
//         filteredProducts = filteredProducts.filter(p => p.status === 'ACTIVE');
//       } else if (status === 'OUT_OF_STOCK') {
       
//         filteredProducts = filteredProducts.filter(p => p.status === 'OUT_OF_STOCK');
//       }
//       setProducts(filteredProducts);

//       setPagination({
//         ...res.data.pagination,
//         total: filteredProducts.length,
//         total_pages: Math.ceil(filteredProducts.length / limit),
//       });
//     }
//   } catch (err) {
//     setError(toast.error((err as ApiError).message || 'Failed to fetch products'));
//   } finally {
//     setLoading(false);
//   }
// }, []);

//   return { products, pagination, loading, error, fetchProducts};
// };

// export const useProductDetails = () => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProduct = useCallback(async (id: string) => {
//     setLoading(true);
//     try {
//       const res = await productService.getProductById(id);
//       if (res.success) setProduct(res.data);
//     } catch (err) {
//       setError((err as ApiError).message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { product, loading, error, fetchProduct };
// }


import { productService } from '@/lib/service/marketplace/marketplace.service';
import { Product, ApiError, ProductsListResponse } from '@/types/marketplace/types';
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<ProductsListResponse['data']['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (page = 1, limit = 10, status?: string) => {
    setLoading(true);
    setError(null);
    try {
      // Pass the status directly to the service - it will handle the mapping
      const res = await productService.getAllProducts(1, 100);
      
      if (res.success) {
        // Use the data exactly as returned from the API
        setAllProducts(res.data.data);

         let filteredProducts = res.data.data;
        if (status && status !== 'All Status') {
          filteredProducts = res.data.data.filter(product => product.status === status);
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        setProducts(paginatedProducts);
        setPagination({
          page,
          limit,
          total: filteredProducts.length,
          total_pages: Math.ceil(filteredProducts.length / limit),
          has_next_page: endIndex < filteredProducts.length,
          has_previous_page: page > 1
        });
      }
    } catch (err) {
      const errorMessage = (err as ApiError).message || 'Failed to fetch products';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    products, 
    pagination, 
    loading, 
    error, 
    fetchProducts 
  };
};