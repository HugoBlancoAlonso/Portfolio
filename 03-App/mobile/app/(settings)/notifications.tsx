import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch, Alert, Platform } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

import { Colors } from '../../constants/Colors';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const { colors, activeTheme: colorScheme } = useAppTheme();

  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPushEnabled(status === 'granted');
  };

  const togglePushNotifications = async (value: boolean) => {
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setPushEnabled(true);
      } else {
        Alert.alert('Permiso denegado', 'Debes habilitar las notificaciones en los ajustes de tu dispositivo.');
        setPushEnabled(false);
      }
    } else {
      // In a real app, we might unsubscribe the push token from the backend
      // But we can't revoke OS permissions programmatically.
      Alert.alert('Información', 'Para desactivar las notificaciones por completo, debes hacerlo desde los ajustes de tu dispositivo.');
      setPushEnabled(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.row}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Notificaciones Push</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Recibe alertas sobre nuevos seguidores, likes y comentarios.
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={togglePushNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
});
