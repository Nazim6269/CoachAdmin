// Coach Profile Types
export interface CoachProfile {
  id: string;
  primary_specialty: string | null;
  specialties: string[];
  experience_level: string | null;
  avg_rating: string | null;
  rating_count: number;
  is_verified: boolean;
  subscription_active: boolean;
}

export interface Coach {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  status: 'Active' | 'Inactive' | 'Pending';
  approved_at: string | null;
  created_at: string;
  session_count: number;
  coach_profile: CoachProfile;
}

export interface CoachesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Coach[];
}

// Session Validation Types
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  type: string;
}

export interface SessionDetails {
  date: string;
  time: string;
  date_time: string;
  appointment_date: string;
  session_time: string | null;
}

export interface SessionValidation {
  id: string;
  athlete: SessionUser;
  coach: SessionUser;
  session: SessionDetails;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  validation_token: string | null;
  is_validated: boolean;
}

export interface SessionValidationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SessionValidation[];
}

// Content Approval Types (Bio Update Requests)
export interface BioUpdateRequest {
  id: number;
  name: string;
  title: string;
  description: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

// API Error
export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
}