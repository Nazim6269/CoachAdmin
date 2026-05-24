const getDashboardTitle = (pathname: string) => {
    const title = pathname?.split("/")[2];
    if (!title) return "Admin Dashboard";
    if (title === "user-management") return "User Management";
    if (title === "booking-management") return "Booking Management";
    if (title === "content-management") return "Content Management";
    if (title === "marketplace-management") return "Marketplace Management";
    if (title === "analytics-reports") return "Analytics & Reports";
    if (title === "subscription-management") return "Subscription Management";
    if (title === "gamify-management") return "Gamify Management";
    if (title === "settings") return "Settings";
    return title;
}

export default getDashboardTitle;