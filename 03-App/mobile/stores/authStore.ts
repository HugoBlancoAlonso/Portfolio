/**
 * Authentication store using Zustand.
 * Manages user state, tokens, and auth actions.
 * Persists tokens in SecureStore for session restoration.
 */

import { Platform } from 'react-native';
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
  updateProfile: (data: any) => Promise<void>;
  updateAvatar: (uri: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
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
      console.error("Login error:", error.response?.data || error.message);
      let message = 'Error al iniciar sesión';
      const detail = error.response?.data?.detail;
      if (typeof detail === 'string') {
        message = detail;
      } else if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
        message = detail[0].msg;
      } else if (error.message) {
        message = `Error de red: ${error.message}`;
      }
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
      console.error("Register error:", error.response?.data || error.message);
      let message = 'Error al registrarse';
      const detail = error.response?.data?.detail;
      if (typeof detail === 'string') {
        message = detail;
      } else if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
        message = detail[0].msg;
      } else if (error.message) {
        message = `Error de red: ${error.message}`;
      }
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

  // ─── Update Profile ────────────────────────────────────────
  updateProfile: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.updateProfile(data);
      set({ user, isLoading: false });
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al actualizar perfil';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Update Avatar ─────────────────────────────────────────
  updateAvatar: async (uri: string) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      
      if (Platform.OS === 'web') {
        const res = await fetch(uri);
        const blob = await res.blob();
        formData.append('file', blob, 'avatar.jpg');
      } else {
        const filename = uri.split('/').pop() || 'avatar.jpg';
        const match = /\.(\w+)$/.exec(filename);
        let ext = match ? match[1].toLowerCase() : 'jpeg';
        if (ext === 'jpg') ext = 'jpeg';
        const type = `image/${ext}`;
        
        formData.append('file', {
          uri,
          name: filename,
          type,
        } as any);
      }

      const user = await authService.updateAvatar(formData);
      set({ user, isLoading: false });
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al actualizar el avatar';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Delete Account ────────────────────────────────────────
  deleteAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.deleteAccount();
      await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al eliminar cuenta';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // ─── Clear Error ────────────────────────────────────────────
  clearError: () => set({ error: null }),
}));
