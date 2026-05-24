import { StatusDropdown } from '../../components/Dashboard/marketplace-management/StatusDropDown'

interface ColumnProps {
  onStatusChange?: (id: string, status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK') => Promise<void>; 
}

export const useProductColumns = ({ onStatusChange }: ColumnProps = {}) => {
  return [
    { label: "Product", accessor: "product" },
    { label: "Brand", accessor: "brand" },
    { label: "Price", accessor: "price" },
    { label: "Stock", accessor: "stock" },
    { label: "Sold", accessor: "sold" },
    {
      label: "Status",
      accessor: "status",
      formatter: (value: string, row: any) => {
        
        if (onStatusChange) {
          return (
            <StatusDropdown
              currentStatus={value}
              productId={row.id}
              onStatusChange={onStatusChange} 
            />
          );
        }
        return <span className={`px-2 py-1 rounded text-xs font-medium bg-gray-500/20`}>{value}</span>;
      }
    }
  ];
};