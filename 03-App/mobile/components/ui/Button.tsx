/**
 * Reusable Button component with variants and loading state.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '../../hooks/useAppTheme';
import { Colors } from '../../constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  icon,
}: ButtonProps) {
  const { colors, activeTheme: colorScheme } = useAppTheme();
  const isDisabled = disabled || loading;

  const buttonStyles = getButtonStyles(variant, size, colors, fullWidth, isDisabled);
  const textStyle = getTextStyle(variant, size, colors, isDisabled);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        buttonStyles,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.textInverse : colors.primary}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[styles.text, textStyle, icon ? { marginLeft: 8 } : null]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

function getButtonStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  colors: typeof Colors.light | typeof Colors.dark,
  fullWidth: boolean,
  disabled: boolean
): ViewStyle {
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    md: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
    lg: { paddingVertical: 18, paddingHorizontal: 32, borderRadius: 16 },
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: disabled ? colors.textTertiary : colors.buttonPrimary },
    secondary: { backgroundColor: colors.buttonSecondary },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: disabled ? colors.textTertiary : colors.primary,
    },
    ghost: { backgroundColor: 'transparent' },
    danger: { backgroundColor: colors.danger },
  };

  return {
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(fullWidth ? { width: '100%' } : {}),
  };
}

function getTextStyle(
  variant: ButtonVariant,
  size: ButtonSize,
  colors: typeof Colors.light | typeof Colors.dark,
  disabled: boolean
) {
  const sizeMap: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 };

  const colorMap: Record<ButtonVariant, string> = {
    primary: colors.textInverse,
    secondary: colors.text,
    outline: disabled ? colors.textTertiary : colors.primary,
    ghost: colors.primary,
    danger: colors.textInverse,
  };

  return {
    fontSize: sizeMap[size],
    color: colorMap[variant],
  };
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
});
