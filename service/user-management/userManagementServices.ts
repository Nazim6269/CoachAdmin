import { apiClient } from "@/lib/api/client"
import { UserDetailsResponse, UserListResponse } from "@/types/user-management"

export const deleteUser = async (id: string) => {
    const response = await apiClient.delete(`/admin/user-list/${id}`)
    return response
}


export const fetchUserDetails = (id: string = ""): Promise<UserDetailsResponse> => {
    return apiClient.get<UserDetailsResponse>(`/admin/user-list/${id}`)
}

export const fetchUserList = async (page: number, limit: number, search?: string, role?: string, status?: string): Promise<UserListResponse> => {
    let url = `/admin/user-list?page=${page}&limit=${limit}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    
    if (role) {
        const mappedRole = role.toLowerCase() === "athlete" ? "user" : role.toLowerCase();
        url += `&role=${encodeURIComponent(mappedRole)}`;
    }
    
    if (status) {
        url += `&status=${encodeURIComponent(status.toLowerCase())}`;
    }

    const response = await apiClient.get<UserListResponse>(url)
    return response;
}

export const patchUser = async (id: string, data: any) => {
    console.log(data, "data")
    const response = await apiClient.patch(`/admin/user-list/${id}`, data)
    return response
}