import { useColorScheme as useColorSchemeCore } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';


export const useColorScheme = () => {
  const coreScheme = useColorSchemeCore();
  return coreScheme === 'unspecified' ? 'light' : coreScheme;
};
