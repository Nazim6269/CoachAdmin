'use client'

import DynamicDropDown from "@/components/reusable/DynamicDropDown";
import Search from "@/components/reusable/Search";
import DynamicTable from "@/components/reusable/DynamicTable";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CustomButton from "../reusable/CustomButton";
import SendIcon from "@/icons/SendIcon";
import SectionWrapper from "./SectionWrapper";
import BulkNotificationModal from "./modal/BulkNotificationModal";
import { ChevronDown } from "lucide-react";
import { useBookingList } from "@/hooks/booking-management/useBookingList";
import SessionBookingModal from "./modal/SessionBookingModal";
import UpdateBookingModal from "./modal/UpdateBookingModal";
import { useDebouncedSearch } from "@/hooks/common/useDebouncedSearch";
import { extractUniqueValues } from "@/utils/extractUniqueValues";
import { useDeleteBookedUser } from "@/hooks/booking-management/useDeleteBookedUser";
import DeleteConfirmModal from "./modal/DeleteConfirmModal";
import StatusModal from "./modal/StatusModal";
import { usePatchBookedUser } from "@/hooks/booking-management/usePatchBookedUser";
import { toast } from "sonner";
import { useExportBooking } from "@/hooks/booking-management/useExportBooking";
import { usePerformance } from "@/hooks/booking-management/usePerformance";
import PerformanceSkeleton from "./skeleton/PerformanceSkeleton";

const metricLabels: Record<string, string> = {
    total_bookings_today: "Total Bookings Today",
    completion_rate: "Completion Rate",
    average_session_duration: "Average Session Duration",
    cancellation_rate: "Cancellation Rate"
}


const BookingManagementContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const [itemsPerPage, setItemsPerPage] = useState(Number(searchParams.get("limit")) || 10);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "");

    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [openBulkModal, setOpenBulkModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openStatusModal, setOpenStatusModal] = useState(false);

    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", currentPage.toString());
        params.set("limit", itemsPerPage.toString());

        if (debouncedSearchTerm) {
            params.set("search", debouncedSearchTerm);
        } else {
            params.delete("search");
        }

        if (selectedStatus) {
            params.set("status", selectedStatus.toLowerCase());
        } else {
            params.delete("status");
        }

        router.push(`${pathname}?${params.toString()}`);
    }, [debouncedSearchTerm, selectedStatus, currentPage, itemsPerPage]);

    //data fetching hooks
    const { data, isError, isLoading } = useBookingList(currentPage, itemsPerPage, debouncedSearchTerm, selectedStatus)
    const { data: allBookingsData } = useBookingList(1, 100);

    const { mutateAsync: deleteBookedUser, isPending: isDeleting } = useDeleteBookedUser()
    const { mutate: exportBooking, isPending: isExporting } = useExportBooking();
    const { data: performanceData, isLoading: isPerformanceLoading, isError: isPerformanceError } = usePerformance();
    const { mutateAsync: patchBookedUser, isPending: isPatching } = usePatchBookedUser();

    const metricsArray = Object?.entries(performanceData?.data ?? {}).map(([key, value]) => ({
        key,
        label: metricLabels[key],
        ...value
    }))



    const bookedUsers = data?.data?.data;
    const pagination = data?.data?.pagination;
    const totalPages = pagination?.total_pages;


    const handleDelete = async (id: string) => {
        try {
            await deleteBookedUser(id);
            toast.success("User deleted successfully");
            setOpenDeleteModal(false);
            setSelectedRow(null);
        } catch (err) {
            toast.error("Failed to delete user");
            console.error(err);
        }
    }



    const allBookings = allBookingsData?.data?.data || [];
    const status = useMemo(() => {
        const statuses = extractUniqueValues(allBookings, "status")?.filter(s =>
            ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].includes(s)
        );
        return ["All", ...statuses];
    }, [allBookings]);

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value === "All" ? "" : value);
    }


    const displayBookedUsers = bookedUsers || [];

    // Define table columns
    const columns = [
        {
            label: "Athelete",
            accessor: "athlete_name",
        },
        {
            label: "Session Type",
            accessor: "session_type",
        },
        {
            label: "Coach Name",
            accessor: "coach_name",

        }, {
            label: "Date & Time",
            accessor: "date_time",
        },
        {
            label: "Status",
            accessor: "status",

            formatter: (value: string, row: any) => {
                const statusColors: Record<string, string> = {
                    UPCOMING: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
                    COMPLETED: "bg-green-500/10 text-green-500 border border-green-500/20",
                    PENDING: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                    CANCELLED: "bg-red-500/10 text-red-500 border border-red-500/20",
                };
                return (
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRow(row);
                            setOpenStatusModal(true);
                        }}
                        className={`inline-flex items-center gap-2 justify-between capitalize px-3 py-1 rounded-md text-[10px] font-semibold tracking-wider cursor-pointer transition-all hover:opacity-80 active:scale-95 ${statusColors[value] || "bg-gray-500/10 text-gray-400 border border-gray-500/20"}`}
                    >
                        {value} <ChevronDown className="w-4 h-4" />
                    </span>
                );
            },
        },
    ];

    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-semibold text-whiteColor">List of Users</h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Search placeholder="Search by athlete, session type or coach..." value={searchTerm} onChange={setSearchTerm} />
                    <DynamicDropDown label={selectedStatus || "All Status"} className="w-full sm:w-40 bg-gray-100/30 text-whiteColor" menuItems={status} onSelect={handleStatusChange} />
                    <CustomButton
                        label={isExporting ? "Exporting..." : "Export Booking Data"}
                        className="bg-blueColor text-whiteColor px-4 disabled:opacity-60"
                        onClick={() => exportBooking()}
                    />
                </div>
            </div>
            <DynamicTable onView={(row) => {
                setSelectedRow(row);
                setOpenModal(true);
            }}
                onDelete={(id) => {
                    const row = bookedUsers?.find((r: any) => r.id === id);
                    setOpenDeleteModal(true);
                    setSelectedRow(row);
                }}
                onWrite={(id) => {
                    const row = bookedUsers?.find((r: any) => r.id === id);
                    setSelectedRow(row);
                    setOpenUpdateModal(true);
                }}
                columns={columns}
                data={displayBookedUsers}
                currentPage={currentPage}
                totalpage={totalPages}
                onPageChange={setCurrentPage}
                setItemsPerPage={setItemsPerPage}
                itemsPerPage={itemsPerPage}
                imageAccessor={"athlete_avatar"}
                loading={isLoading}
            />

            {
                openModal && (
                    <SessionBookingModal
                        isOpen={openModal}
                        data={selectedRow}
                        onClose={() => {
                            setOpenModal(false);
                            setSelectedRow(null);
                        }}
                    />
                )
            }
            {
                openStatusModal && (
                    <StatusModal
                        isOpen={openStatusModal}
                        data={selectedRow}
                        onClose={() => {
                            setOpenStatusModal(false);
                            setSelectedRow(null);
                        }}
                        menuItems={status}
                        isPending={isPatching}
                        onConfirm={async (newStatus) => {
                            try {
                                await patchBookedUser({
                                    id: selectedRow.id,
                                    data: { status: newStatus }
                                });
                                toast.success("Status updated successfully");
                                setOpenStatusModal(false);
                                setSelectedRow(null);
                            } catch (err) {
                                toast.error("Failed to update status");
                            }
                        }}
                    />
                )
            }
            {
                openUpdateModal && (
                    <UpdateBookingModal
                        isOpen={openUpdateModal}
                        data={selectedRow}
                        onClose={() => {
                            setOpenUpdateModal(false);
                            setSelectedRow(null);
                        }}
                    />
                )
            }

            {
                openDeleteModal && (
                    <DeleteConfirmModal
                        isOpen={openDeleteModal}
                        isDeleting={isDeleting}
                        onClose={() => {
                            setOpenDeleteModal(false);
                            setSelectedRow(null);
                        }}
                        onConfirm={() => handleDelete(selectedRow?.id)}

                    />
                )
            }
            {/* bottom part */}
            <SectionWrapper>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6 ">

                    {/* Performance Metrics */}
                    <div className="w-full bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">

                        <h2 className="text-white text-lg font-semibold mb-5 border-b border-[#2a2a2a] py-2">
                            Performance Metrics
                        </h2>

                        <div className="space-y-4">
                            {
                                isLoading ? (
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <PerformanceSkeleton key={index} />
                                    ))
                                ) : (
                                    metricsArray?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-white  pb-3">
                                            <p className="text-gray-400">{item.label}</p>

                                            <div className="flex items-center gap-3">
                                                <p className="font-semibold">{item.value}</p>
                                                <p className={`text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded text-xs`}>{item.change}{item.unit}</p>
                                            </div>
                                        </div>
                                    ))
                                )
                            }

                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="w-full lg:max-w-[320px] bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">

                        <h2 className="text-white text-lg font-semibold mb-5">
                            Quick Actions
                        </h2>

                        <div className="space-y-3">

                            <div onClick={() => setOpenBulkModal(true)} className="flex items-center gap-3 bg-[#262626] hover:bg-[#303030] transition rounded-lg p-3 cursor-pointer">
                                <SendIcon className="text-white" />
                                <p className="text-gray-200 text-sm font-medium">
                                    Send Bulk Message
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </SectionWrapper>

            {
                openBulkModal && (
                    <BulkNotificationModal
                        isOpen={openBulkModal}
                        onClose={() => {
                            setOpenBulkModal(false);
                        }}
                    />
                )
            }
        </div>
    );
};

export default BookingManagementContent;