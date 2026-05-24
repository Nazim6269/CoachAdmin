import { Appointment } from "@/types/booking-management";

export const parseCSVToAppointments = (csv: string): Appointment[] => {
    const [headerLine, ...rows] = csv.trim().split("\n");
    const headers = headerLine.split(",").map((h) => h.trim().replace(/"/g, ""));

    return rows.map((row) => {
        // handle quoted values with commas inside
        const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) ?? [];
        const entry: Record<string, string> = {};
        headers.forEach((h, i) => {
            entry[h] = (values[i] ?? "").replace(/"/g, "").trim();
        });

        return {
            id: "",
            athlete_name: entry["Athlete Name"] ?? "",
            athlete_avatar: "",
            session_type: entry["Session Type"] ?? null,
            coach_name: entry["Coach Name"] ?? "",
            coach_specialization: entry["Coach Specialization"] ?? "",
            date_time: entry["Date & Time"] ?? "",
            appointment_date: entry["Date & Time"] ?? "",
            session_time: null,
            status: (entry["Status"] as Appointment["status"]) ?? "PENDING",
            location: entry["Location"] ?? "",
            duration_minutes: Number(entry["Duration (minutes)"]) || 0,
            description: null,
            notes: "",
            created_at: "",
        };
    });
};