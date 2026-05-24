// 'use client'

// import React, { useState, useEffect, useCallback } from 'react';
// import { useProductList } from '@/hooks/marketplace/useProductQueries';
// import { useProductMutations } from '@/hooks/marketplace/useProductMutation';
// import { MarketplaceHeader } from './marketplace-management/MarketPlaceHeader';
// import { ProductTable } from './marketplace-management/ProductTable';
// import { AddProductModal } from './marketplace-management/modals/AddProductModal';
// import { ProductDetailsModal } from './marketplace-management/modals/ProductDetailsModal';
// import { Product } from '@/types/marketplace/types';

// export const MarketplaceContent = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
//     const [modalState, setModalState] = useState({
//         details: false,
//         add: false,
//         selectedProduct: null as Product | null,
//     });

//     const { products, pagination, loading, error, fetchProducts } = useProductList(); // Remove fetchFilteredProducts from here
//     const { deleteProduct, updateStatus } = useProductMutations();

//     // Rename this to something else
//     const loadProducts = useCallback(() => {
//         if (selectedStatus !== 'All Status') {
//             fetchProducts(currentPage, itemsPerPage, selectedStatus);
//         } else {
//             fetchProducts(currentPage, itemsPerPage);
//         }
//     }, [currentPage, itemsPerPage, selectedStatus, fetchProducts]);

//     useEffect(() => {
//         loadProducts(); 
//     }, [loadProducts]);

//     const handleStatusChange = async (id: string, status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK'): Promise<void> => {
//         const { success } = await updateStatus(id, status);
//         if (success) {
//             await loadProducts(); 
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (!confirm('Delete this product?')) return;
//         const { success } = await deleteProduct(id);
//         if (success) loadProducts(); 
//     };

//     const handleFilterChange = (status: string) => {
        
//         setSelectedStatus(status);
//         setCurrentPage(1); 
//     };

//     return (
//         <div>
//             <MarketplaceHeader 
//                 onAddClick={() => setModalState(prev => ({ ...prev, add: true }))} 
//                 selectedStatus={selectedStatus} 
//                 onStatusChange={handleFilterChange} 
//             />

//             <ProductTable
//                 products={products}
//                 pagination={pagination}
//                 currentPage={currentPage}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={setCurrentPage}
//                 onItemsPerPageChange={setItemsPerPage}
//                 onView={(product) => setModalState({ details: true, add: false, selectedProduct: product })}
//                 onDelete={handleDelete}
//                 onStatusChange={handleStatusChange} 
//                 loading={loading}
//                 error={error || undefined}
//             />

//             <AddProductModal
//                 isOpen={modalState.add}
//                 onClose={() => setModalState(prev => ({ ...prev, add: false }))}
//                 onSuccess={() => loadProducts()}
//             />

//             <ProductDetailsModal
//                 isOpen={modalState.details}
//                 data={modalState.selectedProduct}
//                 onClose={() => setModalState({ details: false, add: false, selectedProduct: null })}
//             />
//         </div>
//     );
// }


'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useProductList } from '@/hooks/marketplace/useProductQueries';
import { useProductMutations } from '@/hooks/marketplace/useProductMutation';
import { MarketplaceHeader } from './marketplace-management/MarketPlaceHeader';
import { ProductTable } from './marketplace-management/ProductTable';
import { AddProductModal } from './marketplace-management/modals/AddProductModal';
import { ProductDetailsModal } from './marketplace-management/modals/ProductDetailsModal';
import { Product } from '@/types/marketplace/types';
import { DEMO_PRODUCTS, DEMO_PRODUCT_PAGINATION } from '@/public/demoData/DemoData';

export const MarketplaceContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
    const [modalState, setModalState] = useState({
        details: false,
        add: false,
        selectedProduct: null as Product | null,
    });

    const { products, pagination, loading, error, fetchProducts } = useProductList();
    const { deleteProduct, updateStatus } = useProductMutations();

    const hasStatusFilter = selectedStatus !== 'All Status';
    const showDemo = !loading && !hasStatusFilter && (!!error || !products.length);

    const displayProducts = showDemo ? DEMO_PRODUCTS : products;
    const displayPagination = showDemo ? DEMO_PRODUCT_PAGINATION : pagination;

    const loadProducts = useCallback(() => {
        // Pass the status to fetchProducts - if it's 'All Status', pass undefined
        const statusParam = selectedStatus !== 'All Status' ? selectedStatus : undefined;
        fetchProducts(currentPage, itemsPerPage, statusParam);
    }, [currentPage, itemsPerPage, selectedStatus, fetchProducts]);

    // Reset to page 1 when status filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleStatusChange = async (id: string, status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK'): Promise<void> => {
        const { success } = await updateStatus(id, status);
        if (success) {
            await loadProducts();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;
        const { success } = await deleteProduct(id);
        if (success) loadProducts();
    };

    const handleFilterChange = (status: string) => {
        setSelectedStatus(status);
        // Don't set currentPage here - it's handled by the useEffect above
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <div>
            <MarketplaceHeader 
                onAddClick={() => setModalState(prev => ({ ...prev, add: true }))} 
                selectedStatus={selectedStatus} 
                onStatusChange={handleFilterChange} 
            />

            <ProductTable
                products={displayProducts}
                pagination={displayPagination}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                onView={(product) => setModalState({ details: true, add: false, selectedProduct: product })}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange} 
                loading={loading}
                error={showDemo ? undefined : (error || undefined)}
            />

            <AddProductModal
                isOpen={modalState.add}
                onClose={() => setModalState(prev => ({ ...prev, add: false }))}
                onSuccess={() => loadProducts()}
            />

            <ProductDetailsModal
                isOpen={modalState.details}
                data={modalState.selectedProduct}
                onClose={() => setModalState({ details: false, add: false, selectedProduct: null })}
            />
        </div>
    );
};