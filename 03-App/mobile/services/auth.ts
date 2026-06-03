/**
 * Authentication service — API calls for auth flows.
 */

import api from './api';
import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  UserProfile,
} from '../types';

export const authService = {
  /**
   * Register a new user with email and password.
   */
  register: async (data: RegisterRequest): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login with email and password.
   */
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Login with Google OAuth (send ID token from Google Sign-In).
   */
  loginWithGoogle: async (idToken: string): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login/google', {
      id_token: idToken,
    });
    return response.data;
  },

  /**
   * Login with Apple Sign-In (send identity token).
   */
  loginWithApple: async (
    identityToken: string,
    fullName?: string
  ): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login/apple', {
      identity_token: identityToken,
      full_name: fullName,
    });
    return response.data;
  },

  /**
   * Refresh access token using refresh token.
   */
  refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  /**
   * Get the authenticated user's profile.
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/users/me');
    return response.data;
  },
};
