import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PaginationPageProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  dataLength: number;
  currentPage: number;
  setItemsPerPage?: (count: number) => void;
  totalItems?: number;
  itemsPerPage: number;
}

function PaginationPage({
  totalPages,
  onPageChange,
  dataLength,
  currentPage,
  setItemsPerPage,
  totalItems,
  itemsPerPage,
}: PaginationPageProps) {

  const getPagination = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  const effectiveTotalItems =
    typeof totalItems === "number" ? totalItems : dataLength;

  const startIndex = dataLength > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, effectiveTotalItems);

  const handleItemsPerPageChange = (value: number) => {
    if (setItemsPerPage) setItemsPerPage(value);
    onPageChange(1);
  };

  const originalArray = [1, 5, 10, 25, 50, 100];
  const uniqueArray = [...new Set(originalArray)];

  return (
    <div className="mt-10 mb-0 lg:mb-20">
      <div className="flex justify-end">

        {totalPages > 0 && (
          <div className="flex items-center w-full justify-between mt-6 gap-4 flex-wrap">

            {/* Pagination */}
            <div className="flex items-center gap-1">

              {/* Previous */}
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1.5 flex items-center justify-center border border-gray-600 text-gray-200 rounded hover:bg-gray-800 disabled:opacity-40"
              >
                <MdArrowBackIosNew size={15} />
              </button>

              {getPagination().map((page, i) => (
                <button
                  key={i}
                  onClick={() => typeof page === "number" && onPageChange(page)}
                  disabled={page === "..."}
                  className={`px-3 py-[4px] rounded cursor-pointer text-sm border transition ${page === currentPage
                    ? "bg-blue-500 text-white border-blue-500 font-medium"
                    : "text-gray-300 border-gray-600 hover:bg-gray-800"
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1.5 flex items-center justify-center border border-gray-600 text-gray-200 rounded hover:bg-gray-800 disabled:opacity-40"
              >
                <MdArrowForwardIos size={15} />
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default PaginationPage;