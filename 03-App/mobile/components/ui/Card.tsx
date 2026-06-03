/**
 * Reusable Card component with elevation and variants.
 */

import React from 'react';
import { StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: number;
}

export function Card({
  children,
  style,
  variant = 'default',
  padding = 16,
}: CardProps) {
  const _colorScheme = useColorScheme();
  const colorScheme = _colorScheme === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const variantStyles: Record<string, ViewStyle> = {
    default: {
      backgroundColor: colors.cardBackground,
    },
    elevated: {
      backgroundColor: colors.surfaceElevated,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    outlined: {
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
  };

  return (
    <View
      style={[
        styles.card,
        { padding },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});
