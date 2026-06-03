import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

import { Colors } from '../../constants/Colors';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/auth';
import { useRouter } from 'expo-router';

export default function ChangePasswordScreen() {
  const { colors, activeTheme: colorScheme } = useAppTheme();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (newPassword === currentPassword) {
      Alert.alert('Error', 'La nueva contraseña no puede ser igual a la actual');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.detail || 'No se pudo cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <Input
          label="Contraseña Actual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          icon="lock-closed-outline"
          secureTextEntry
        />
        <Input
          label="Nueva Contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          icon="lock-closed-outline"
          secureTextEntry
        />
        <Input
          label="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          icon="lock-closed-outline"
          secureTextEntry
        />
        <Button
          title="Actualizar Contraseña"
          onPress={handleSave}
          loading={loading}
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  form: { gap: 16 },
});
