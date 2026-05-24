export interface Badge {
  id: string;
  key: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  icon_url: string;
  criteria: {
    type: string;
    field: string;
    value?: number;
  };
  users_earned: number;
  created_at: string;
  updated_at: string;
  recent_earners?: Array<{
    user_id: string;
    user_name: string;
    user_email: string;
    user_avatar: string;
    earned_at: string;
  }>;
}

export interface CreateBadgePayload {
  key: string;
  title: string;
  description: string;
  points: number;
  criteria: {
    type: string;
    field: string;
    value?: number;
  };
  icon?: File; // For image upload
}

export interface UpdateBadgePayload extends Partial<CreateBadgePayload> {
  id: string;
}
