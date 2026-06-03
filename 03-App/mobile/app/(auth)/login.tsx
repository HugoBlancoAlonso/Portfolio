/**
 * Login screen — email/password + social login (Google, Apple).
 */

import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
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

export default function LoginScreen() {
  const { colors, activeTheme: colorScheme } = useAppTheme();
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    try {
      const payload: any = { 
        identifier: identifier.trim(),
        password 
      };
      
      await login(payload);
    } catch {
      // Error is handled by the store
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
            <Ionicons name="people" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Bienvenido
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Inicia sesión para continuar
          </Text>
        </View>

        {/* ─── Error ───────────────────────────────────────────── */}
        {error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: colors.danger + '15' },
            ]}
          >
            <Ionicons name="alert-circle" size={18} color={colors.danger} />
            <Text style={[styles.errorText, { color: colors.danger }]}>
              {error}
            </Text>
          </View>
        )}

        {/* ─── Form ────────────────────────────────────────────── */}
        <View style={styles.form}>
          <Input
            label="Email, teléfono o usuario"
            placeholder="tu@email.com, +34... o usuario"
            keyboardType="default"
            autoCapitalize="none"
            autoComplete="email"
            icon="person-outline"
            value={identifier}
            onChangeText={(text) => {
              setIdentifier(text);
              clearError();
            }}
          />

          <Input
            label="Contraseña"
            placeholder="Tu contraseña"
            secureTextEntry
            autoComplete="password"
            icon="lock-closed-outline"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              clearError();
            }}
          />

          <View style={styles.forgotPasswordContainer}>
            <Text 
              style={[styles.forgotPasswordText, { color: colors.primary }]}
              onPress={() => Alert.alert('Recuperar contraseña', 'Funcionalidad próximamente')}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </View>

          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            size="lg"
          />
        </View>

        {/* ─── Divider ─────────────────────────────────────────── */}
        {/*
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.textTertiary }]}>
            o continúa con
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>

        <View style={styles.socialButtons}>
          <Button
            title="Google"
            onPress={() => {
              // TODO: Implement Google Sign-In
              Alert.alert('Google Sign-In', 'Se implementará con expo-auth-session');
            }}
            variant="outline"
            icon={
              <Ionicons name="logo-google" size={20} color={colors.text} />
            }
            style={styles.socialButton}
          />

          {Platform.OS === 'ios' && (
            <Button
              title="Apple"
              onPress={() => {
                // TODO: Implement Apple Sign-In
                Alert.alert(
                  'Apple Sign-In',
                  'Se implementará con expo-apple-authentication'
                );
              }}
              variant="outline"
              icon={
                <Ionicons name="logo-apple" size={20} color={colors.text} />
              }
              style={styles.socialButton}
            />
          )}
        </View>
        */}

        {/* ─── Footer ──────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            ¿No tienes cuenta?{' '}
          </Text>
          <Link href="/(auth)/register" asChild>
            <Text style={{ ...styles.footerLink, color: colors.primary }}>
              Regístrate
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
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  socialButton: {
    flex: 1,
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
