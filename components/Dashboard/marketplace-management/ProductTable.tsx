'use client'

import DynamicTable from '@/components/reusable/DynamicTable';
import { Product } from '@/types/marketplace/types'
import { useProductColumns } from '../../../hooks/marketplace/useProductColumns';

interface Props {
    products: Product[];
    pagination: any;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (limit: number) => void;
    onView: (product: Product) => void;
    onDelete: (id: string) => void;
    onStatusChange?: (id: string, status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK') => Promise<void>;
    loading?: boolean;
    error?: string;
}

export const ProductTable = ({
    products,
    pagination,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    onView,
    onDelete,
    onStatusChange,
    loading,
    error,
}: Props) => {
    const columns = useProductColumns({ onStatusChange });

    const tableData = products.map(p => ({
    id: p.id,
    product: p.productName,
    brand: p.brandName,
    price: `$${p.price}`,
    stock: p.stockQuantity,
    sold: "343", 
    status: p.status === 'OUT_OF_STOCK' ? 'OUT_OF_STOCK' : (p.isActive ? 'ACTIVE' : 'INACTIVE'),
    img: p.images?.[0],
}));

    
    const handleView = (row: any) => {
        const originalProduct = products.find(p => p.id === row.id);
        if (originalProduct) {
            onView(originalProduct);
        } else {
            onView(row as any); 
        }
    };

    return (
        <DynamicTable
            onView={handleView} 
            onDelete={(id) => onDelete(id)}
            onWrite={(id) => console.log("Edit clicked, id:", id)}
            columns={columns}
            data={tableData}
            currentPage={currentPage}
            totalpage={pagination?.total_pages || 1}
            onPageChange={onPageChange}
            setItemsPerPage={onItemsPerPageChange}
            itemsPerPage={itemsPerPage}
            loading={loading}
            error={error}
        />
    );
};