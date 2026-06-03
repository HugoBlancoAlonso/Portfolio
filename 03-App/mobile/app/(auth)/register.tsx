/**
 * Register screen — create a new account with username + email/phone and password.
 */

import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function RegisterScreen() {
  const { colors, activeTheme: colorScheme } = useAppTheme();
  const { register, isLoading, error, clearError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [registerMethod, setRegisterMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone = (p: string) => /^\+?[0-9]{5,15}$/.test(p);

  const handleRegister = async () => {
    setFormError(null);
    if (!username.trim() || !identifier.trim() || !password || !confirmPassword) {
      setFormError('Por favor completa todos los campos');
      return;
    }
    const cleanUsername = username.trim().replace(/^@/, '');
    if (cleanUsername.length < 4) {
      setFormError('El nombre de usuario debe tener al menos 4 letras');
      return;
    }
    if (registerMethod === 'email' && !isValidEmail(identifier.trim())) {
      setFormError('Por favor ingresa un correo electrónico válido');
      return;
    }
    if (registerMethod === 'phone' && !isValidPhone(identifier.trim())) {
      setFormError('Por favor ingresa un número de teléfono válido');
      return;
    }
    if (password.length < 8) {
      setFormError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }
    try {
      const payload: any = { password, username: username.trim().replace(/^@/, '') };
      if (registerMethod === 'email') payload.email = identifier.trim();
      else payload.phone_number = identifier.trim();

      await register(payload);
    } catch {
      // Error handled by store
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ──────────────────────────────────────────── */}
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: colors.primaryLight },
            ]}
          >
            <Ionicons name="person-add" size={36} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Crear Cuenta
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Únete a nuestra comunidad
          </Text>
        </View>

        {/* ─── Error ───────────────────────────────────────────── */}
        {(formError || error) && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: colors.danger + '15' },
            ]}
          >
            <Ionicons name="alert-circle" size={18} color={colors.danger} />
            <Text style={[styles.errorText, { color: colors.danger }]}>
              {formError || error}
            </Text>
          </View>
        )}

        {/* ─── Form ────────────────────────────────────────────── */}
        <View style={styles.form}>
          <Input
            label="Nombre de usuario"
            placeholder="@tu_usuario"
            autoCapitalize="none"
            autoComplete="username"
            icon="at-outline"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setFormError(null);
              clearError();
            }}
          />

          <View style={styles.toggleContainer}>
            <Text
              style={[
                styles.toggleText,
                registerMethod === 'email' ? { color: colors.primary, fontWeight: '700' } : { color: colors.textSecondary }
              ]}
              onPress={() => { setRegisterMethod('email'); setIdentifier(''); setFormError(null); clearError(); }}
            >
              Email
            </Text>
            <Text style={{ color: colors.border }}> | </Text>
            <Text
              style={[
                styles.toggleText,
                registerMethod === 'phone' ? { color: colors.primary, fontWeight: '700' } : { color: colors.textSecondary }
              ]}
              onPress={() => { setRegisterMethod('phone'); setIdentifier(''); setFormError(null); clearError(); }}
            >
              Teléfono
            </Text>
          </View>

          {registerMethod === 'email' ? (
            <Input
              label="Email"
              placeholder="tu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              icon="mail-outline"
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                setFormError(null);
                clearError();
              }}
            />
          ) : (
            <Input
              label="Teléfono"
              placeholder="+34 600 000 000"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoComplete="tel"
              icon="call-outline"
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                setFormError(null);
                clearError();
              }}
            />
          )}

          <Input
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            secureTextEntry
            icon="lock-closed-outline"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setFormError(null);
              clearError();
            }}
          />

          <Input
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            secureTextEntry
            icon="lock-closed-outline"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setFormError(null);
              clearError();
            }}
          />

          <Button
            title="Crear Cuenta"
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
            size="lg"
          />
        </View>

        {/* ─── Footer ──────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            ¿Ya tienes cuenta?{' '}
          </Text>
          <Link href="/(auth)/login" asChild>
            <Text style={{ ...styles.footerLink, color: colors.primary }}>
              Inicia Sesión
            </Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    letterSpacing: 0.2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    flex: 1,
  },
  form: {
    gap: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  toggleText: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 15,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
