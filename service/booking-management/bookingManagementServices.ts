import { apiClient } from "@/lib/api/client"
import { BookedUserDetails, BookingListResponse, MetricsResponse } from "@/types/booking-management"


export const fetchBookedUserDetails = async (id: string) => {

    const resoponse = await apiClient.get<BookedUserDetails>(`/admin/booking-list/${id}`)
    return resoponse
}


export const fetchBookingList = async (page: number = 1, limit: number = 10, search?: string, status?: string): Promise<BookingListResponse> => {
    let url = `/admin/booking-list?page=${page}&limit=${limit}`;
    console.log(status, "status")
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (status) url += `&status=${encodeURIComponent(status)}`;

    const response = await apiClient.get<BookingListResponse>(url)
    return response;
}


export const sendBulkNotification = async (data: any) => {
    const response = await apiClient.post("/admin/booking-list/send-bulk-notification", data);
    return response;
}

export const deleteBookedUser = async (id: string) => {
    const response = await apiClient.delete(`/admin/booking-list/${id}`);
    return response
};

export const fetchExportBookingData = async (): Promise<string> => {
    const response = await apiClient.get<string>("/admin/booking-list/export");
    return response;
};


export const patchBookedUserStatus = async (id: string, data: any) => {
    const response = await apiClient.patch(`/admin/booking-list/${id}`, data);
    return response;
};

export const fetchPerformanceData = async () => {
    const response = await apiClient.get<MetricsResponse>("/admin/booking-list/metrics");
    return response;
};