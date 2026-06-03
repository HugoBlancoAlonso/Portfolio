/**
 * Settings screen — app settings, theme toggle, logout.
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useThemeStore } from '../../stores/themeStore';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  danger = false,
}: SettingsItemProps) {
  const { colors, activeTheme: colorScheme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingsItem,
        pressed && onPress && { opacity: 0.7 },
      ]}
    >
      <View
        style={[
          styles.settingsIcon,
          {
            backgroundColor: danger
              ? colors.danger + '15'
              : colors.primaryLight,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={danger ? colors.danger : colors.primary}
        />
      </View>
      <View style={styles.settingsContent}>
        <Text
          style={[
            styles.settingsTitle,
            { color: danger ? colors.danger : colors.text },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.settingsSubtitle, { color: colors.textSecondary }]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        onPress && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textTertiary}
          />
        )
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  
  const { theme, setTheme } = useThemeStore();
  const { colors, activeTheme } = useAppTheme();
  const { logout, deleteAccount, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción es irreversible. Todos tus datos, publicaciones y seguidores serán eliminados para siempre. ¿Estás absolutamente seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
            } catch (err: any) {
              Alert.alert('Error', err?.message || 'No se pudo eliminar la cuenta');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Account ───────────────────────────────────────────── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        CUENTA
      </Text>
      <View
        style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <SettingsItem
          icon="person-outline"
          title="Editar Perfil"
          subtitle={user?.email || user?.phone_number || ''}
          onPress={() => router.push('/(settings)/edit-profile')}
        />
        <View style={[styles.divider, { backgroundColor: colors.separator }]} />
        <SettingsItem
          icon="lock-closed-outline"
          title="Cambiar Contraseña"
          onPress={() => router.push('/(settings)/change-password')}
        />
      </View>

      {/* ─── Preferences ──────────────────────────────────────── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        PREFERENCIAS
      </Text>
      <View
        style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <SettingsItem
          icon="notifications-outline"
          title="Notificaciones"
          subtitle="Configurar alertas push"
          onPress={() => router.push('/(settings)/notifications')}
        />
        <View style={[styles.divider, { backgroundColor: colors.separator }]} />
        <SettingsItem
          icon={activeTheme === 'dark' ? 'moon' : 'sunny-outline'}
          title="Modo Oscuro"
          subtitle={theme === 'system' ? 'Automático' : 'Manual'}
          rightElement={
            <Switch
              value={activeTheme === 'dark'}
              onValueChange={(val) => setTheme(val ? 'dark' : 'light')}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          }
        />
      </View>

      {/* ─── About ─────────────────────────────────────────────── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        INFORMACIÓN
      </Text>
      <View
        style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <SettingsItem
          icon="document-text-outline"
          title="Términos y Condiciones"
          onPress={() => router.push('/(settings)/terms')}
        />
        <View style={[styles.divider, { backgroundColor: colors.separator }]} />
        <SettingsItem
          icon="help-circle-outline"
          title="Ayuda y Soporte"
          onPress={() => Alert.alert('Ayuda y Soporte', 'Contacta a support@ejemplo.com para recibir ayuda.')}
        />
      </View>

      {/* ─── Logout ────────────────────────────────────────────── */}
      <View
        style={[
          styles.section,
          { backgroundColor: colors.surface, borderColor: colors.border, marginTop: 20 },
        ]}
      >
        <SettingsItem
          icon="log-out-outline"
          title="Cerrar Sesión"
          onPress={handleLogout}
          danger
        />
        <View style={[styles.divider, { backgroundColor: colors.separator, marginLeft: 0 }]} />
        <SettingsItem
          icon="trash-outline"
          title="Eliminar Cuenta"
          onPress={handleDeleteAccount}
          danger
        />
      </View>

      <Text style={[styles.versionText, { color: colors.textTertiary }]}>
        Social Network v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
    marginTop: 20,
  },
  section: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 66,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
  },
});
