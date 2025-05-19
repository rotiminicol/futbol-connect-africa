
export type UserRole = 'player' | 'coach' | 'agent' | 'manager' | 'club_staff' | 'admin' | null;

export interface Profile {
  id: string;
  full_name: string;
  username?: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  cover_image_url?: string;
  bio?: string;
  location?: string;
  phone?: string;
  is_verified: boolean;
  is_public: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlayerProfile {
  id: string;
  age?: number;
  height?: number;
  weight?: number;
  position?: string;
  secondary_position?: string;
  preferred_foot?: string;
  current_club?: string;
  available_for_transfer: boolean;
  stats?: any;
  achievements?: any;
  tags?: string[];
}

export interface StaffProfile {
  id: string;
  organization?: string;
  role_title?: string;
  experience?: string;
  credentials?: string[];
  philosophy?: string;
  achievements?: any;
}

export interface Media {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  thumbnail_url?: string;
  is_profile_media: boolean;
  created_at: string;
}

export interface Opportunity {
  id: string;
  user_id: string;
  title: string;
  description: string;
  location?: string;
  position_needed?: string;
  age_range?: string;
  closing_date?: string;
  contact_info?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Shortlist {
  id: string;
  user_id: string;
  player_id: string;
  notes?: string;
  created_at: string;
}

export interface ProfileVisit {
  id: string;
  visitor_id: string;
  profile_id: string;
  visited_at: string;
}

export interface Endorsement {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message?: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}
