/**
 * Global TypeScript type definitions for the social network app.
 */

// ─── User ──────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface UserProfile extends User {
  followers_count: number;
  following_count: number;
  posts_count: number;
}

export interface UserBrief {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

// ─── Auth ──────────────────────────────────────────────────────

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

// ─── Posts ──────────────────────────────────────────────────────

export interface Post {
  id: string;
  content: string;
  image_urls: string[] | null;
  author: UserBrief;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostCreate {
  content: string;
  image_urls?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: UserBrief;
  post_id: string;
  created_at: string;
}

// ─── Notifications ─────────────────────────────────────────────

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  message: string;
  is_read: boolean;
  sender: UserBrief;
  reference_id: string | null;
  created_at: string;
}

// ─── Common ────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface MessageResponse {
  message: string;
  success: boolean;
}
