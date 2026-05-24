"use client";

import Image from "next/image";
import React from "react";
import PaginationPage from "./PaginationPage";
import DeleteIcon from "@/icons/DeleteIcon";
import EyeOnIcon from "@/icons/EyeOnIcon";
import WriteIcon from "@/icons/WriteIcon";
import { ChevronDown } from "lucide-react";
import TableSkeleton from "../Dashboard/skeleton/TableSkeleton";
import { getAvatarUrl } from "../Dashboard/shared/UserActivityCard";

interface ColumnConfig {
  label: React.ReactNode;
  width?: number | string;
  accessor: string;
  formatter?: (value: any, row: any, index?: number) => React.ReactNode;
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: Record<string, any>[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onView?: (row: any) => void;
  onDelete?: (id: any) => void;
  onWrite?: (id: any) => void;
  onStatus?: (row: any) => void; // Updated type definition for onStatus
  noDataMessage?: string;
  totalpage: number;
  totalItems?: number;
  setItemsPerPage?: (n: number) => void;
  loading?: boolean;
  error?: string;
  border?: boolean;
  renderFooter?: (colSpan: number) => React.ReactNode; imageAccessor?: string | string[]
}

export default function DynamicTable({
  columns,
  data,
  currentPage,
  itemsPerPage,
  border = true,
  onPageChange,
  loading = false,
  onView,
  totalpage,
  onDelete,
  onWrite,
  onStatus,
  noDataMessage = "No data found!",
  totalItems,
  setItemsPerPage,
  error,
  renderFooter, imageAccessor
}: DynamicTableProps) {

  const hasActions = Boolean(onView || onDelete || onWrite || onStatus);
  const colSpan = columns.length + (hasActions ? 1 : 0);

  return (
    <div>
      <div
        className={`rounded-t-md ${border ? "border border-primaryColor" : ""
          }`}
      >
        <div className="overflow-auto bg-blackColor">
          <table className="min-w-[1000px] w-full text-left bg-blackColor">

            {/* TABLE HEADER */}
            <thead className="sticky top-0 text-white">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{ width: col.width || "auto" }}
                    className="px-4 bg-secondaryColor py-2 text-sm font-medium"
                  >
                    {col.label}
                  </th>
                ))}

                {hasActions && (
                  <th className="px-4 py-2 text-sm font-medium text-whiteColor bg-secondaryColor">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {/* LOADING STATE */}
              {loading ? (
                <TableSkeleton
                  columns={columns}
                  rows={itemsPerPage}
                  hasActions={hasActions}
                />
              ) : data?.length > 0 ? (

                /* DATA ROWS */
                data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-secondaryColor"
                  >
                    {columns.map((col, idx) => {

                      const value = row[col.accessor];
                      const index = (currentPage - 1) * itemsPerPage + i;

                      return (
                        <td
                          key={idx}
                          style={{ width: col.width || "auto" }}
                          className="px-4 py-3 text-sm text-whiteColor"
                        >
                          {col.formatter ? (
                            col.formatter(value, row, index)
                          ) : (() => {

                            const imageSources = imageAccessor
                              ? Array.isArray(imageAccessor) ? imageAccessor : [imageAccessor]
                              : ["img"];

                            const rawImgUrl = imageSources.reduce<string | undefined>(
                              (found, key) => found ?? (row[key] ? row[key] : undefined),
                              undefined
                            );

                            const resolvedImg = rawImgUrl ? getAvatarUrl(rawImgUrl) : null;
                            const isNameCol =
                              col.accessor === "user_name" ||
                              col.accessor === "full_name" ||
                              col.accessor === "athlete" ||
                              col.accessor === "athlete_name";

                            if (isNameCol && resolvedImg) {
                              return (
                                <div className="flex  items-center gap-2">
                                  <Image
                                    src={resolvedImg ?? "/empty_image.jpg"}
                                    alt={String(value)}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                                  />
                                  <span>{value}</span>
                                </div>
                              );
                            }

                            if (col.accessor === "coach_name") {
                              return (
                                <div className="flex flex-col">
                                  <span>{value}</span>
                                  <span className="text-xs text-gray-400">
                                    {row.coach_role || "Career Coaching"}
                                  </span>
                                </div>
                              );
                            }

                            return value;
                          })()}
                        </td>
                      );
                    })}

                    {/* ACTIONS */}
                    {hasActions && (
                      <td className="px-4 py-3">
                        <div className="flex gap-4 items-center">

                          {onView && (
                            <span
                              className="cursor-pointer"
                              onClick={() => onView(row)}
                            >
                              <EyeOnIcon className="border border-secondaryColor bg-primaryColor w-7 h-7 rounded-md p-1" />
                            </span>
                          )}

                          {onDelete && (
                            <span
                              className="cursor-pointer"
                              onClick={() => onDelete(row.id)}
                            >
                              <DeleteIcon className="border border-secondaryColor bg-primaryColor w-7 h-7 rounded-md p-1" />
                            </span>
                          )}

                          {onWrite && (
                            <span
                              className="cursor-pointer"
                              onClick={() => onWrite(row.id)}
                            >
                              <WriteIcon className="border border-secondaryColor bg-primaryColor w-7 h-7 rounded-md p-1" />
                            </span>
                          )}

                        </div>
                      </td>
                    )}
                  </tr>
                ))

              ) : (

                /* EMPTY STATE */
                <tr>
                  <td
                    colSpan={colSpan}
                    className="px-4 py-10 text-center text-sm"
                  >
                    {error ? (
                      <p className="text-red-500 text-xl capitalize font-semibold">
                        {error} — please login again
                      </p>
                    ) : (
                      <p className="text-xl text-gray-500 capitalize font-semibold">
                        {noDataMessage}
                      </p>
                    )}
                  </td>
                </tr>

              )}
            </tbody>

            {/* FOOTER */}
            {renderFooter && (
              <tfoot>{renderFooter(colSpan)}</tfoot>
            )}

          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <PaginationPage
        totalPages={totalpage}
        dataLength={data?.length || 0}
        totalItems={totalItems}
        onPageChange={onPageChange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}