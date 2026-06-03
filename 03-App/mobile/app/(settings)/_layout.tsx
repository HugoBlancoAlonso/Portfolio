import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function SettingsLayout() {
  const router = useRouter();
  const { colors } = useAppTheme();

  const HeaderLeft = () => (
    <Pressable 
      onPress={() => router.back()} 
      hitSlop={20}
      style={{ 
        marginLeft: Platform.OS === 'ios' ? 0 : 4,
        marginRight: Platform.OS === 'ios' ? 8 : 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ionicons 
        name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} 
        size={Platform.OS === 'ios' ? 30 : 24} 
        color={colors.text} 
      />
    </Pressable>
  );

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text, fontWeight: '700' },
        headerShadowVisible: false,
        headerLeft: () => <HeaderLeft />,
      }}
    >
      <Stack.Screen
        name="edit-profile"
        options={{
          headerTitle: 'Editar Perfil',
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerTitle: 'Cambiar Contraseña',
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerTitle: 'Notificaciones',
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          headerTitle: 'Términos',
        }}
      />
    </Stack>
  );
}
