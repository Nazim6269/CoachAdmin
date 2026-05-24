import { useMutation } from "@tanstack/react-query";
import { fetchExportBookingData } from "@/service/booking-management/bookingManagementServices";
import { generateBookingPDF } from "@/utils/generateBookingPDF";
import { toast } from "sonner";
import { parseCSVToAppointments } from "@/utils/parseCSVToAppointments";



export const useExportBooking = () => {
    return useMutation({
        mutationFn: fetchExportBookingData,
        onSuccess: (response) => {
            const csvData = response;

            if (!csvData) {
                toast.info("No booking data available to export.");
                return;
            }
            const appointments = parseCSVToAppointments(csvData);
            const doc = generateBookingPDF(appointments);
            const fileName = `booking-report-${new Date().toISOString().split("T")[0]}.pdf`;
            doc.save(fileName);

            toast.success("Booking report downloaded successfully!");
        },
        onError: (err) => {
            toast.error("Failed to export booking data. Please try again.");
            console.error(err);
        },
    });
};