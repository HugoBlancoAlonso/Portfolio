/**
 * useAuth hook — convenient access to auth state and actions.
 */

import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    isRestoringSession,
    error,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    restoreSession,
    refreshProfile,
    updateProfile,
    updateAvatar,
    deleteAccount,
    clearError,
  } = useAuthStore();

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    isRestoringSession,
    error,

    // Actions
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    restoreSession,
    refreshProfile,
    updateProfile,
    updateAvatar,
    deleteAccount,
    clearError,
  };
}
