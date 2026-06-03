import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

import { Colors } from '../../constants/Colors';

export default function TermsScreen() {
  const { colors, activeTheme: colorScheme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Términos y Condiciones</Text>
      
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.text, { color: colors.textSecondary }]}>
          Al usar esta aplicación, aceptas nuestros términos de servicio y políticas de privacidad.
        </Text>
        <Text style={[styles.text, { color: colors.textSecondary, marginTop: 16 }]}>
          Nos reservamos el derecho de modificar estos términos en cualquier momento.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
  },
});
