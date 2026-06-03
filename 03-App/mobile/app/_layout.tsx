/**
 * Root layout — controls routing between auth and main app.
 * Restores session on app launch.
 */

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { LogBox } from 'react-native';

import { Loading } from '../components/ui/Loading';
import { useAuth } from '../hooks/useAuth';

// Ignore expo-notifications warnings in Expo Go
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go',
]);

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, isRestoringSession, restoreSession } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    ...FontAwesome.font,
  });

  // Restore session on app launch
  useEffect(() => {
    restoreSession();
  }, []);

  // Hide splash when ready
  useEffect(() => {
    if (fontsLoaded && !isRestoringSession) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isRestoringSession]);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isRestoringSession || !fontsLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Not authenticated → redirect to login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Authenticated → redirect to main app
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, segments, isRestoringSession, fontsLoaded]);

  if (!fontsLoaded || isRestoringSession) {
    return <Loading fullScreen message="Cargando..." />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(settings)" options={{ presentation: 'card' }} />
    </Stack>
  );
}
