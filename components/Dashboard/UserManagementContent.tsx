'use client'

import { ChevronDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import DynamicDropDown from "@/components/reusable/DynamicDropDown";
import Search from "@/components/reusable/Search";
import DynamicTable from "@/components/reusable/DynamicTable";
import DetailsModal from "./modal/DetailsUserModal";
import UpdateUserModal from "./modal/UpdateUserModal";
import DeleteConfirmModal from "./modal/DeleteConfirmModal";
import StatusModal from "./modal/StatusModal";
import { useUserList } from "@/hooks/user-management/useUserList";
import { useDeleteUser } from "@/hooks/user-management/useDeleteUser";
import { usePatchUser } from "@/hooks/user-management/usePatchUser";
import { toast } from "sonner";
import { useDebouncedSearch } from "@/hooks/common/useDebouncedSearch";
import { extractUniqueValues } from "@/utils/extractUniqueValues";

const UserManagementContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(Number(searchParams.get("limit")) || 10);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [role, selectRole] = useState(searchParams.get("role") || "");
  const [status, selectStatus] = useState(searchParams.get("status") || "");

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [updateUserId, setUpdateUserId] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedSearch(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());
    params.set("limit", itemsPerPage.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (role) {
      params.set("role", role.toLowerCase());
    } else {
      params.delete("role");
    }

    if (status) {
      params.set("status", status.toLowerCase());
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, role, status, currentPage, itemsPerPage]);

  const { data, isLoading, error } = useUserList(currentPage, itemsPerPage, debouncedSearch, role, status);
  const { data: allUsersData } = useUserList(1, 100);

  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutateAsync: patchUser, isPending: isPatching } = usePatchUser();

  const users = data?.data?.data;
  const pagination = data?.data?.pagination;
  const totalPages = pagination?.total_pages;

  const displayUsers = users || [];

  const allUsers = allUsersData?.data?.data || [];
  const extractedRoles = useMemo(() => {
    const roles = extractUniqueValues(allUsers, "role");
    return ["All", ...roles];
  }, [allUsers]);

  const extractedStatus = useMemo(() => {
    const statuses = extractUniqueValues(allUsers, "status");
    return ["All", ...statuses];
  }, [allUsers]);


  const columns = [
    { label: "User Name", accessor: "user_name" },
    { label: "Role", accessor: "role" },
    { label: "Email", accessor: "email" },
    { label: "Joining Date", accessor: "joining_date" },
    {
      label: "Status",
      accessor: "status",
      formatter: (value: string, row: any) => {
        const statusColors: Record<string, string> = {
          Active: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
          Blocked: "bg-red-500/10 text-red-400 border border-red-500/20",
        };
        return (
          <span
            onClick={() => {
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
          <Search
            placeholder="Search by name, email or role"
            value={search}
            onChange={setSearch}
          />
          <div className="flex justify-between gap-2">
            <DynamicDropDown
              label={role || "All Roles"}
              className="sm:w-40 bg-gray-100/30 text-whiteColor"
              menuItems={extractedRoles}
              onSelect={(value) => {
                const selectedValue = value === "All" ? "" : value;
                selectRole(selectedValue);
              }}
            />
            <DynamicDropDown
              label={status || "All Status"}
              className="sm:w-40 bg-gray-100/30 text-whiteColor"
              menuItems={extractedStatus}
              onSelect={(value) => selectStatus(value === "All" ? "" : value)}
            />
          </div>
        </div>
      </div>

      {/* No results message shown inline, above the table */}
      {!isLoading && debouncedSearch && displayUsers?.length === 0 && (
        <div className="flex items-center justify-center py-12 text-gray-400 text-sm font-medium">
          No users found matching <span className="ml-1 text-white font-semibold">"{debouncedSearch}"</span>
        </div>
      )}

      <DynamicTable
        onView={(row) => { setSelectedRow(row); setOpenModal(true); }}
        onDelete={(id) => { setDeleteUserId(id); setOpenDeleteModal(true); }}
        onWrite={(id) => { setUpdateUserId(id); setOpenUpdateModal(true); }}
        columns={columns}
        data={displayUsers}
        loading={isLoading}
        currentPage={currentPage}
        totalpage={totalPages}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        itemsPerPage={itemsPerPage} imageAccessor={"avatar"}
      />

      {openModal && (
        <DetailsModal isOpen={openModal} data={selectedRow} onClose={() => { setOpenModal(false); setSelectedRow(null); }} />
      )}

      {openStatusModal && (
        <StatusModal
          isOpen={openStatusModal}
          data={selectedRow}
          onClose={() => { setOpenStatusModal(false); setSelectedRow(null); }}
          menuItems={extractedStatus}
          isPending={isPatching}
          onConfirm={async (newStatus) => {
            try {
              await patchUser({
                id: selectedRow.id,
                data: { status: newStatus.toLowerCase() }
              });
              toast.success("Status updated successfully");
              setOpenStatusModal(false);
              setSelectedRow(null);
            } catch (err) {
              toast.error("Failed to update status");
            }
          }}
        />
      )}
      {openUpdateModal && (
        <UpdateUserModal isOpen={openUpdateModal} userId={updateUserId} onClose={() => { setOpenUpdateModal(false); setUpdateUserId(null); }} />
      )}
      {openDeleteModal && (
        <DeleteConfirmModal
          isOpen={openDeleteModal}
          isDeleting={isDeleting}
          onClose={() => { setOpenDeleteModal(false); setDeleteUserId(null); }}
          onConfirm={async () => {
            if (!deleteUserId) return;
            try {
              await deleteUser(deleteUserId);
              toast.success("User deleted successfully");
              setOpenDeleteModal(false);
              setDeleteUserId(null);
            } catch (err) {
              toast.error("Failed to delete user");
              console.error(err);
            }
          }}
        />
      )}
    </div>
  );
};

export default UserManagementContent;