/**
 * Authentication store using Zustand.
 * Manages user state, tokens, and auth actions.
 * Persists tokens in SecureStore for session restoration.
 */

import { create } from 'zustand';

import { Config } from '../constants/Config';
import { authService } from '../services/auth';
import type { LoginRequest, RegisterRequest, UserProfile } from '../types';
import * as SecureStore from '../utils/storage';

const { STORAGE_KEYS } = Config;

interface AuthState {
  // ─── State ──────────────────────────────────────────────────
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRestoringSession: boolean;
  error: string | null;

  // ─── Actions ────────────────────────────────────────────────
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  loginWithApple: (identityToken: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // ─── Initial State ──────────────────────────────────────────
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isRestoringSession: true, // Start true — check on app launch
  error: null,

  // ─── Login ──────────────────────────────────────────────────
  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await authService.login(data);
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);

      const user = await authService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.detail || 'Error al iniciar sesión';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Register ───────────────────────────────────────────────
  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await authService.register(data);
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);

      const user = await authService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.detail || 'Error al registrarse';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Google Login ───────────────────────────────────────────
  loginWithGoogle: async (idToken) => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await authService.loginWithGoogle(idToken);
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);

      const user = await authService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.detail || 'Error con Google Sign-In';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Apple Login ────────────────────────────────────────────
  loginWithApple: async (identityToken, fullName) => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await authService.loginWithApple(identityToken, fullName);
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);

      const user = await authService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.detail || 'Error con Apple Sign-In';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Logout ─────────────────────────────────────────────────
  logout: async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // ─── Restore Session ───────────────────────────────────────
  restoreSession: async () => {
    set({ isRestoringSession: true });
    try {
      const token = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      if (!token) {
        set({ isRestoringSession: false });
        return;
      }

      const user = await authService.getProfile();
      set({ user, isAuthenticated: true, isRestoringSession: false });
    } catch {
      // Token expired or invalid — clear and require login
      await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      set({ isRestoringSession: false });
    }
  },

  // ─── Refresh Profile ───────────────────────────────────────
  refreshProfile: async () => {
    try {
      const user = await authService.getProfile();
      set({ user });
    } catch {
      // Silently fail — profile refresh is not critical
    }
  },

  // ─── Clear Error ────────────────────────────────────────────
  clearError: () => set({ error: null }),
}));
