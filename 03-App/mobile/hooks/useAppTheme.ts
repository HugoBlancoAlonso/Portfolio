import { useColorScheme } from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import { Colors } from '../constants/Colors';

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const { theme } = useThemeStore();
  
  const activeTheme = theme === 'system' ? (systemColorScheme || 'light') : theme;
  const colors = Colors[activeTheme];
  
  return {
    activeTheme,
    colors,
  };
}
