import { Appointment } from "@/types/booking-management";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateBookingPDF = (bookings: Appointment[]) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    // ── Header ────────────────────────────────────────────────────────────────
    doc.setFillColor(15, 23, 42);          // dark navy
    doc.rect(0, 0, 297, 22, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Management Report", 14, 14);

    const now = new Date();
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
        `Generated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        297 - 14,
        14,
        { align: "right" }
    );

    // ── Summary row ───────────────────────────────────────────────────────────
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(9);
    doc.text(`Total records: ${bookings.length}`, 14, 30);

    // ── Table ─────────────────────────────────────────────────────────────────
    autoTable(doc, {
        startY: 35,
        head: [["Athlete", "Session Type", "Coach", "Date & Time", "Duration (min)", "Location", "Status"]],
        body: bookings.map((b) => [
            b.athlete_name ?? "—",
            b.session_type ?? "—",
            b.coach_name ?? "—",
            b.date_time ? new Date(b.date_time).toLocaleString() : (b.appointment_date ?? "—"),
            b.duration_minutes?.toString() ?? "—",
            b.location ?? "—",
            b.status ?? "—",
        ]),
        styles: {
            fontSize: 8,
            cellPadding: 3,
            lineColor: [220, 220, 220],
            lineWidth: 0.2,
        },
        headStyles: {
            fillColor: [30, 64, 175],   // blue-700
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "left",
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250],
        },
        columnStyles: {
            6: {
                fontStyle: "bold",
            },
        },
        didDrawCell: (data) => {
            // Colour-code Status column (index 6) in body rows
            if (data.section === "body" && data.column.index === 6) {
                const status = String(data.cell.raw ?? "");
                const colorMap: Record<string, [number, number, number]> = {
                    UPCOMING: [59, 130, 246],
                    COMPLETED: [34, 197, 94],
                    PENDING: [234, 179, 8],
                    CANCELLED: [239, 68, 68],
                    CONFIRMED: [99, 102, 241],
                };
                const color = colorMap[status] ?? [100, 100, 100];
                doc.setTextColor(...color);
                doc.setFont("helvetica", "bold");
                doc.text(
                    status,
                    data.cell.x + 3,
                    data.cell.y + data.cell.height / 2 + 1
                );
                doc.setTextColor(30, 30, 30);
                doc.setFont("helvetica", "normal");
                return false; // prevent default text drawing
            }
        },
        margin: { left: 14, right: 14 },
    });

    // ── Page numbers ──────────────────────────────────────────────────────────
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 297 / 2, 205, { align: "center" });
    }

    return doc;
};
