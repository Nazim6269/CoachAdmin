import { useMutation } from "@tanstack/react-query"
import { sendBulkNotification } from "@/service/booking-management/bookingManagementServices"
import { toast } from "sonner";

export const useBulkNotification = () => {
    return useMutation({
        mutationFn: (data: any) => sendBulkNotification(data),
        onSuccess: () => {
            toast.success("Bulk notification sent successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send bulk notification");
        }
    })
}