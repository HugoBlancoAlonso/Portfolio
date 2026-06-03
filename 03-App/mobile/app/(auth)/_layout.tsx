/**
 * Auth group layout — screens for unauthenticated users.
 */

import { Stack } from 'expo-router';
import React from 'react';

import { Colors } from '../../constants/Colors';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function AuthLayout() {
  const { colors, activeTheme: colorScheme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
