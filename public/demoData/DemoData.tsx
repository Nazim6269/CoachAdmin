import type { SubscriptionPlan } from "@/types/subscription/types";
import type { Badge } from "@/types/badge/types";

export const DEMO_OVERVIEW = {
  totalUsers: 1284,
  activeUsers: 847,
  totalSessions: 3621,
  monthlyRevenue: 45800,
};

export const DEMO_USER_DISTRIBUTION = {
  total: 1284,
  coaches: 342,
  athletes: 942,
};

export const DEMO_REVENUE_TREND = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 28500 },
  { month: "Mar", revenue: 35800 },
  { month: "Apr", revenue: 41200 },
  { month: "May", revenue: 38900 },
  { month: "Jun", revenue: 45800 },
];

export const DEMO_RECENT_ACTIVITY = [
  {
    user_avatar_url: null,
    name: "Sarah Johnson",
    time_ago: "2 minutes ago",
    message: "completed a new session booking",
    activity_date: "May 24, 2026",
  },
  {
    user_avatar_url: null,
    name: "Mike Chen",
    time_ago: "15 minutes ago",
    message: "subscribed to Premium plan",
    activity_date: "May 24, 2026",
  },
  {
    user_avatar_url: null,
    name: "Emily Davis",
    time_ago: "1 hour ago",
    message: "earned 'Marathon' badge",
    activity_date: "May 24, 2026",
  },
  {
    user_avatar_url: null,
    name: "Alex Rivera",
    time_ago: "3 hours ago",
    message: "purchased from marketplace",
    activity_date: "May 23, 2026",
  },
  {
    user_avatar_url: null,
    name: "Lisa Thompson",
    time_ago: "5 hours ago",
    message: "updated profile information",
    activity_date: "May 23, 2026",
  },
];

export const DEMO_COACHES = [
  { id: "1", name: "Sarah Johnson", email: "sarah.johnson@example.com", avatar: null, status: "Active" as const, approved_at: "2024-01-10", created_at: "2023-12-01", session_count: 142, coach_profile: { id: "c1", primary_specialty: "Strength Training", specialties: ["Strength Training", "HIIT", "CrossFit"], experience_level: "Senior", avg_rating: "4.8", rating_count: 89, is_verified: true, subscription_active: true } },
  { id: "2", name: "Mike Chen", email: "mike.chen@example.com", avatar: null, status: "Active" as const, approved_at: "2024-02-15", created_at: "2024-01-05", session_count: 98, coach_profile: { id: "c2", primary_specialty: "Yoga & Flexibility", specialties: ["Yoga", "Pilates", "Meditation"], experience_level: "Intermediate", avg_rating: "4.6", rating_count: 54, is_verified: true, subscription_active: true } },
  { id: "3", name: "Emily Davis", email: "emily.davis@example.com", avatar: null, status: "Pending" as const, approved_at: null, created_at: "2025-04-20", session_count: 0, coach_profile: { id: "c3", primary_specialty: "HIIT", specialties: ["HIIT", "Cardio", "Bootcamp"], experience_level: "Junior", avg_rating: null, rating_count: 0, is_verified: false, subscription_active: false } },
  { id: "4", name: "Alex Rivera", email: "alex.rivera@example.com", avatar: null, status: "Active" as const, approved_at: "2024-03-01", created_at: "2024-02-01", session_count: 215, coach_profile: { id: "c4", primary_specialty: "Boxing", specialties: ["Boxing", "MMA", "Self-Defense"], experience_level: "Senior", avg_rating: "4.9", rating_count: 134, is_verified: true, subscription_active: true } },
  { id: "5", name: "Lisa Thompson", email: "lisa.thompson@example.com", avatar: null, status: "Inactive" as const, approved_at: "2024-06-01", created_at: "2024-05-15", session_count: 67, coach_profile: { id: "c5", primary_specialty: "Nutrition", specialties: ["Nutrition", "Weight Management", "Meal Planning"], experience_level: "Senior", avg_rating: "4.7", rating_count: 42, is_verified: true, subscription_active: false } },
];

export const DEMO_SESSION_VALIDATIONS = [
  { id: "s1", athlete: { id: "a1", name: "James Wilson", email: "james@example.com", avatar: null, role: "Athlete", type: "premium" }, coach: { id: "c1", name: "Sarah Johnson", email: "sarah@example.com", avatar: null, role: "Coach", type: "coach" }, session: { date: "May 25, 2026", time: "10:00 AM", date_time: "2026-05-25T10:00:00", appointment_date: "2026-05-25", session_time: "10:00" }, status: "COMPLETED" as const, validation_token: "tok_abc123", is_validated: true },
  { id: "s2", athlete: { id: "a2", name: "Maria Garcia", email: "maria@example.com", avatar: null, role: "Athlete", type: "standard" }, coach: { id: "c2", name: "Mike Chen", email: "mike@example.com", avatar: null, role: "Coach", type: "coach" }, session: { date: "May 25, 2026", time: "02:00 PM", date_time: "2026-05-25T14:00:00", appointment_date: "2026-05-25", session_time: "14:00" }, status: "CONFIRMED" as const, validation_token: "tok_def456", is_validated: false },
  { id: "s3", athlete: { id: "a3", name: "Tom Harris", email: "tom@example.com", avatar: null, role: "Athlete", type: "premium" }, coach: { id: "c4", name: "Alex Rivera", email: "alex@example.com", avatar: null, role: "Coach", type: "coach" }, session: { date: "May 24, 2026", time: "09:00 AM", date_time: "2026-05-24T09:00:00", appointment_date: "2026-05-24", session_time: "09:00" }, status: "COMPLETED" as const, validation_token: "tok_ghi789", is_validated: true },
  { id: "s4", athlete: { id: "a4", name: "Sophia Lee", email: "sophia@example.com", avatar: null, role: "Athlete", type: "standard" }, coach: { id: "c5", name: "Lisa Thompson", email: "lisa@example.com", avatar: null, role: "Coach", type: "coach" }, session: { date: "May 26, 2026", time: "11:30 AM", date_time: "2026-05-26T11:30:00", appointment_date: "2026-05-26", session_time: "11:30" }, status: "PENDING" as const, validation_token: null, is_validated: false },
  { id: "s5", athlete: { id: "a5", name: "Emma Brown", email: "emma@example.com", avatar: null, role: "Athlete", type: "standard" }, coach: { id: "c1", name: "Sarah Johnson", email: "sarah@example.com", avatar: null, role: "Coach", type: "coach" }, session: { date: "May 23, 2026", time: "05:00 PM", date_time: "2026-05-23T17:00:00", appointment_date: "2026-05-23", session_time: "17:00" }, status: "CANCELLED" as const, validation_token: null, is_validated: false },
];

export const DEMO_BIO_REQUESTS = [
  { id: 1, name: "Sarah Johnson", title: "Updated Coaching Philosophy", description: "I have developed a new holistic approach to strength training that incorporates mobility work and recovery protocols...", status: "pending" as const, created_at: "2026-05-22" },
  { id: 2, name: "Mike Chen", title: "New Yoga Certification", description: "Recently completed advanced Yoga Teacher Training (RYT-500) and would like to update my credentials and add new class offerings...", status: "pending" as const, created_at: "2026-05-21" },
  { id: 3, name: "Alex Rivera", title: "Added Boxing Specialization", description: "Requesting to add 'Kickboxing' and 'Muay Thai' to my list of specialties based on new certifications earned...", status: "approved" as const, created_at: "2026-05-19" },
];

export const DEMO_PRODUCTS = [
  { id: "p1", productName: "Pro Resistance Bands Set", categoryId: "cat1", price: 49.99, stockQuantity: 150, brandName: "FitGear", discount: 10, description: "Set of 5 resistance bands with varying tension levels for full-body workouts.", isActive: true, status: "ACTIVE" as const, createdAt: "2026-01-15", updatedAt: "2026-05-01", images: [], hasImages: false },
  { id: "p2", productName: "Organic Whey Protein 2lb", categoryId: "cat2", price: 39.99, stockQuantity: 85, brandName: "NutriPure", discount: 0, description: "Premium grass-fed whey protein isolate, chocolate flavor.", isActive: true, status: "ACTIVE" as const, createdAt: "2026-02-10", updatedAt: "2026-05-10", images: [], hasImages: false },
  { id: "p3", productName: "Yoga Mat Premium Extra Thick", categoryId: "cat1", price: 29.99, stockQuantity: 200, brandName: "ZenFit", discount: 15, description: "Extra thick 6mm eco-friendly yoga mat with non-slip surface.", isActive: true, status: "ACTIVE" as const, createdAt: "2026-01-20", updatedAt: "2026-04-28", images: [], hasImages: false },
  { id: "p4", productName: "Adjustable Dumbbells 5-25lb", categoryId: "cat1", price: 199.99, stockQuantity: 0, brandName: "FitGear", discount: 5, description: "Space-saving adjustable dumbbells with quick-change weight system.", isActive: false, status: "OUT_OF_STOCK" as const, createdAt: "2026-03-05", updatedAt: "2026-05-15", images: [], hasImages: false },
  { id: "p5", productName: "Pre-Workout Energy Booster", categoryId: "cat2", price: 34.99, stockQuantity: 120, brandName: "NutriPure", discount: 0, description: "Clean energy pre-workout formula with beta-alanine and caffeine.", isActive: true, status: "ACTIVE" as const, createdAt: "2026-02-28", updatedAt: "2026-05-12", images: [], hasImages: false },
  { id: "p6", productName: "Foam Roller - High Density", categoryId: "cat1", price: 24.99, stockQuantity: 0, brandName: "RecoverPro", discount: 20, description: "High-density foam roller for muscle recovery and myofascial release.", isActive: false, status: "INACTIVE" as const, createdAt: "2026-04-01", updatedAt: "2026-05-20", images: [], hasImages: false },
  { id: "p7", productName: "Training Jump Rope", categoryId: "cat1", price: 14.99, stockQuantity: 300, brandName: "SpeedRope", discount: 0, description: "Lightweight speed jump rope with ball bearing handles.", isActive: true, status: "ACTIVE" as const, createdAt: "2026-01-05", updatedAt: "2026-04-15", images: [], hasImages: false },
];

export const DEMO_ANALYTICS_OVERVIEW = {
  data: {
    totalRevenue: 284500,
    userGrowth: 1284,
    sessionVolume: 3621,
    completed: 2847,
    cancelled: 423,
  },
};

export const DEMO_ANALYTICS_REVENUE = [
  { label: "Jan", revenue: 32000 },
  { label: "Feb", revenue: 28500 },
  { label: "Mar", revenue: 35800 },
  { label: "Apr", revenue: 41200 },
  { label: "May", revenue: 38900 },
  { label: "Jun", revenue: 45800 },
  { label: "Jul", revenue: 42500 },
  { label: "Aug", revenue: 47100 },
  { label: "Sep", revenue: 44300 },
  { label: "Oct", revenue: 48900 },
  { label: "Nov", revenue: 46200 },
  { label: "Dec", revenue: 52100 },
];

export const DEMO_SESSION_TYPES = {
  data: [
    { type: "One-on-One", count: 184 },
    { type: "Group Class", count: 96 },
    { type: "Nutrition Consult", count: 52 },
    { type: "Recovery Session", count: 38 },
    { type: "Assessment", count: 28 },
  ],
};

export const DEMO_PLANS: SubscriptionPlan[] = [
  { id: "plan_1", name: "Starter", price: "29", currency: "USD", interval: "month", features: ["1 coaching session/month", "Basic workout plans", "Email support", "Progress tracking"], description: "Perfect for beginners", is_active: 1, kind: "basic" },
  { id: "plan_2", name: "Pro", price: "79", currency: "USD", interval: "month", features: ["4 coaching sessions/month", "Custom nutrition plan", "Priority support", "Advanced analytics", "Session recordings"], description: "For dedicated athletes", is_active: 1, kind: "popular" },
  { id: "plan_3", name: "Elite", price: "149", currency: "USD", interval: "month", features: ["Unlimited coaching sessions", "Personalized meal plans", "24/7 priority support", "VIP facility access", "Guest passes (2/month)", "Exclusive workshops"], description: "The ultimate experience", is_active: 1, kind: "premium" },
];

export const DEMO_BADGES: Badge[] = [
  { id: "b1", key: "first_session", title: "First Session", description: "Completed your first training session", points: 10, icon: "first_session", icon_url: "", criteria: { type: "count", field: "sessions", value: 1 }, users_earned: 847, created_at: "2026-01-01", updated_at: "2026-05-01" },
  { id: "b2", key: "goal_setter", title: "Goal Setter", description: "Completed training for 3 consecutive days", points: 20, icon: "goal_setter", icon_url: "", criteria: { type: "streak", field: "daily_sessions", value: 3 }, users_earned: 523, created_at: "2026-01-01", updated_at: "2026-05-01" },
  { id: "b3", key: "consistency_master", title: "Consistency Master", description: "Finished 10 training sessions", points: 50, icon: "consistency_master", icon_url: "", criteria: { type: "count", field: "sessions", value: 10 }, users_earned: 312, created_at: "2026-01-01", updated_at: "2026-05-01" },
  { id: "b4", key: "marathon_trainer", title: "Marathon Trainer", description: "Completed a session before 7 AM", points: 15, icon: "first_session", icon_url: "", criteria: { type: "time", field: "session_time" }, users_earned: 189, created_at: "2026-01-01", updated_at: "2026-05-01" },
  { id: "b5", key: "perfect_week", title: "Perfect Week", description: "Completed all 7 days without missing a session", points: 30, icon: "goal_setter", icon_url: "", criteria: { type: "streak", field: "weekly_sessions", value: 7 }, users_earned: 98, created_at: "2026-01-01", updated_at: "2026-05-01" },
  { id: "b6", key: "community_hero", title: "Community Hero", description: "Referred 5 friends to the platform", points: 40, icon: "consistency_master", icon_url: "", criteria: { type: "count", field: "referrals", value: 5 }, users_earned: 67, created_at: "2026-01-01", updated_at: "2026-05-01" },
];

export const DEMO_PRODUCT_PAGINATION = {
  page: 1, limit: 10, total: 7, total_pages: 1, has_next_page: false, has_previous_page: false,
};

export const DEMO_BOOKING_LIST = {
  data: {
    data: [
      { id: "1", athlete_name: "James Wilson", athlete_avatar: "", session_type: "One-on-One", coach_name: "Sarah Johnson (Strength)", date_time: "May 25, 2026 10:00 AM", status: "UPCOMING", appointment_date: "2026-05-25", session_time: "10:00", duration_minutes: 60, location: "Studio A", description: null, notes: "", created_at: "2026-05-20" },
      { id: "2", athlete_name: "Maria Garcia", athlete_avatar: "", session_type: "Group Class", coach_name: "Mike Chen (Yoga)", date_time: "May 25, 2026 02:00 PM", status: "CONFIRMED", appointment_date: "2026-05-25", session_time: "14:00", duration_minutes: 45, location: "Studio B", description: null, notes: "", created_at: "2026-05-19" },
      { id: "3", athlete_name: "Tom Harris", athlete_avatar: "", session_type: "One-on-One", coach_name: "Emily Davis (HIIT)", date_time: "May 24, 2026 09:00 AM", status: "COMPLETED", appointment_date: "2026-05-24", session_time: "09:00", duration_minutes: 60, location: "Studio A", description: null, notes: "", created_at: "2026-05-18" },
      { id: "4", athlete_name: "Sophia Lee", athlete_avatar: "", session_type: "Nutrition Consult", coach_name: "Lisa Thompson (Nutrition)", date_time: "May 24, 2026 11:30 AM", status: "COMPLETED", appointment_date: "2026-05-24", session_time: "11:30", duration_minutes: 30, location: "Online", description: null, notes: "", created_at: "2026-05-17" },
      { id: "5", athlete_name: "Daniel Kim", athlete_avatar: "", session_type: "One-on-One", coach_name: "Alex Rivera (Boxing)", date_time: "May 26, 2026 08:00 AM", status: "PENDING", appointment_date: "2026-05-26", session_time: "08:00", duration_minutes: 60, location: "Studio C", description: null, notes: "", created_at: "2026-05-16" },
      { id: "6", athlete_name: "Emma Brown", athlete_avatar: "", session_type: "Group Class", coach_name: "Sarah Johnson (Strength)", date_time: "May 23, 2026 05:00 PM", status: "CANCELLED", appointment_date: "2026-05-23", session_time: "17:00", duration_minutes: 45, location: "Main Hall", description: null, notes: "Client requested cancellation", created_at: "2026-05-15" },
      { id: "7", athlete_name: "Ryan Patel", athlete_avatar: "", session_type: "One-on-One", coach_name: "Mike Chen (Yoga)", date_time: "May 26, 2026 04:00 PM", status: "UPCOMING", appointment_date: "2026-05-26", session_time: "16:00", duration_minutes: 60, location: "Studio B", description: null, notes: "", created_at: "2026-05-14" },
      { id: "8", athlete_name: "Olivia Turner", athlete_avatar: "", session_type: "Recovery Session", coach_name: "Emily Davis (HIIT)", date_time: "May 25, 2026 07:00 PM", status: "CONFIRMED", appointment_date: "2026-05-25", session_time: "19:00", duration_minutes: 30, location: "Recovery Room", description: null, notes: "", created_at: "2026-05-13" },
      { id: "9", athlete_name: "Liam White", athlete_avatar: "", session_type: "One-on-One", coach_name: "Alex Rivera (Boxing)", date_time: "May 27, 2026 10:30 AM", status: "PENDING", appointment_date: "2026-05-27", session_time: "10:30", duration_minutes: 60, location: "Studio C", description: null, notes: "", created_at: "2026-05-12" },
      { id: "10", athlete_name: "Ava Martinez", athlete_avatar: "", session_type: "Nutrition Consult", coach_name: "Lisa Thompson (Nutrition)", date_time: "May 24, 2026 03:00 PM", status: "COMPLETED", appointment_date: "2026-05-24", session_time: "15:00", duration_minutes: 30, location: "Online", description: null, notes: "", created_at: "2026-05-11" },
    ],
    pagination: { page: 1, limit: 10, total: 10, total_pages: 1, has_next_page: false, has_previous_page: false },
  },
  success: true,
  statusCode: 200,
  message: "Success",
};

export const DEMO_PERFORMANCE_METRICS = {
  data: {
    total_bookings_today: { value: 12, change: 8, is_positive: true, unit: "%" },
    completion_rate: { value: 87, change: 3, is_positive: true, unit: "%" },
    average_session_duration: { value: 52, change: 2, is_positive: true, unit: " min" },
    cancellation_rate: { value: 13, change: 5, is_positive: false, unit: "%" },
  },
};

export const DEMO_USER_LIST = {
  data: {
    data: [
      { id: "1", user_name: "Alice Johnson", role: "Coach", email: "alice.johnson@example.com", joining_date: "2024-01-15", status: "Active", avatar: "" },
      { id: "2", user_name: "Bob Smith", role: "Athlete", email: "bob.smith@example.com", joining_date: "2024-02-20", status: "Active", avatar: "" },
      { id: "3", user_name: "Carol Williams", role: "Athlete", email: "carol.williams@example.com", joining_date: "2024-03-10", status: "Blocked", avatar: "" },
      { id: "4", user_name: "David Brown", role: "Coach", email: "david.brown@example.com", joining_date: "2024-01-05", status: "Active", avatar: "" },
      { id: "5", user_name: "Eva Martinez", role: "Athlete", email: "eva.martinez@example.com", joining_date: "2024-04-12", status: "Active", avatar: "" },
      { id: "6", user_name: "Frank Lee", role: "Admin", email: "frank.lee@example.com", joining_date: "2023-11-01", status: "Active", avatar: "" },
      { id: "7", user_name: "Grace Kim", role: "Athlete", email: "grace.kim@example.com", joining_date: "2024-05-22", status: "Blocked", avatar: "" },
      { id: "8", user_name: "Henry Davis", role: "Coach", email: "henry.davis@example.com", joining_date: "2024-02-14", status: "Active", avatar: "" },
      { id: "9", user_name: "Ivy Chen", role: "Athlete", email: "ivy.chen@example.com", joining_date: "2024-06-01", status: "Active", avatar: "" },
      { id: "10", user_name: "Jack Wilson", role: "Athlete", email: "jack.wilson@example.com", joining_date: "2024-03-28", status: "Active", avatar: "" },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 10,
      total_pages: 1,
      has_next_page: false,
      has_previous_page: false,
    },
  },
};

export const demoData = [
  {
    id: "1",
    full_name: "Leslie Alexander",
    email_address: "felicia.reid@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "maid",
    mobile_number: "+14882918803",
    createdAt: "2014-05-30T00:00:00Z",
    time: "2014-05-30T10:30:00Z",
    additional_information: "Website",
    status: "Pre Application",
  },
  {
    id: "2",
    full_name: "Devon Lane",
    email_address: "bill.sanders@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "employer",
    mobile_number: "+18102458249",
    createdAt: "2015-05-27T00:00:00Z",
    time: "2015-05-27T14:15:00Z",
    additional_information: "Phone Call",
    status: "Applied",
  },
  {
    id: "3",
    full_name: "Eleanor Pena",
    email_address: "georgia.young@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "maid",
    mobile_number: "+14882918803",
    createdAt: "2012-02-11T00:00:00Z",
    time: "2012-02-11T09:00:00Z",
    additional_information: "Facebook",
    status: "Pre Application",
  },
  {
    id: "4",
    full_name: "Kathryn Murphy",
    email_address: "jessica.hanson@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "employer",
    mobile_number: "+14884608141",
    createdAt: "2014-01-14T00:00:00Z",
    time: "2014-01-14T16:45:00Z",
    additional_information: "Email",
    status: "Applied",
  },
  {
    id: "5",
    full_name: "Robert Fox",
    email_address: "nathan.roberts@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "maid",
    mobile_number: "+14882634865",
    createdAt: "2014-08-30T00:00:00Z",
    time: "2014-08-30T11:20:00Z",
    additional_information: "WhatsApp",
    status: "Pre Application",
  },
  {
    id: "6",
    full_name: "Ronald Richards",
    email_address: "tanya.hill@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "employer",
    mobile_number: "+14884145917",
    createdAt: "2016-09-18T00:00:00Z",
    time: "2016-09-18T13:30:00Z",
    additional_information: "Website",
    status: "Pending",
  },
  {
    id: "7",
    full_name: "Bessie Cooper",
    email_address: "kenzi.lawson@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "maid",
    mobile_number: "+19143008346",
    createdAt: "2013-12-10T00:00:00Z",
    time: "2013-12-10T08:00:00Z",
    additional_information: "Referral",
    status: "Pre Application",
  },
  {
    id: "8",
    full_name: "Cameron Williamson",
    email_address: "willie.jennings@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "employer",
    mobile_number: "+14882634869",
    createdAt: "2013-10-08T00:00:00Z",
    time: "2013-10-08T15:45:00Z",
    additional_information: "Instagram",
    status: "Pre Application",
  },
  {
    id: "9",
    full_name: "Wade Warren",
    email_address: "dolores.chambers@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "maid",
    mobile_number: "+14882820363",
    createdAt: "2013-07-27T00:00:00Z",
    time: "2013-07-27T10:30:00Z",
    additional_information: "Email",
    status: "Inactive",
  },
  {
    id: "10",
    full_name: "Ralph Edwards",
    email_address: "nevaeh.simmons@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "employer",
    mobile_number: "+18102448985",
    createdAt: "2017-08-16T00:00:00Z",
    time: "2017-08-16T14:20:00Z",
    additional_information: "Website",
    status: "Applied",
  },
  {
    id: "11",
    full_name: "Marvin McKinney",
    email_address: "tim.jennings@example.com",
    actor: "Sarah Meadors",
    time_in_status: "6 minutes, 39 seconds",
    note: "Complete",
    type: "Add Document to User",
    details:
      "Document Client Agency Agreement Placement Fee & Refund Policy was added to user Sabrina Sultana",
    reason: " when client status was changed to",
    changed_by: "Sarah Meadors",
    enquiry_type: "maid",
    mobile_number: "+19143008184",
    createdAt: "2016-09-23T00:00:00Z",
    time: "2016-09-23T09:15:00Z",
    additional_information: "Phone Call",
    status: "Pre Application",
  
  },
];
