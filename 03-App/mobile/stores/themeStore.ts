import { create } from 'zustand';
import * as SecureStore from '../utils/storage';

export type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',
  setTheme: async (theme) => {
    set({ theme });
    await SecureStore.setItemAsync('APP_THEME', theme);
  },
  loadTheme: async () => {
    try {
      const storedTheme = await SecureStore.getItemAsync('APP_THEME');
      if (storedTheme) {
        set({ theme: storedTheme as ThemeMode });
      }
    } catch {
      // Ignore errors
    }
  },
}));
