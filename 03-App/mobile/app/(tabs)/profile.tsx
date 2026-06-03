/**
 * Profile screen — user's own profile with stats and posts.
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/Colors';
import { Config } from '../../constants/Config';
import { useAuth } from '../../hooks/useAuth';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { colors, activeTheme: colorScheme } = useAppTheme();
  const { user } = useAuth();
  const router = useRouter();

  const displayAvatar = user?.avatar_url 
    ? (user.avatar_url.startsWith('http') ? user.avatar_url : `${Config.API_BASE_URL}${user.avatar_url}`) 
    : null;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Profile Header ────────────────────────────────────────────── */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarWrapper}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.primaryLight, borderColor: colors.primary },
            ]}
          >
            {displayAvatar ? (
              <Image source={{ uri: displayAvatar }} style={styles.avatarImage} />
            ) : (
              <Text style={[styles.avatarText, { color: colors.primary }]}>
                {user?.full_name?.charAt(0)?.toUpperCase() || '?'}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.infoBox, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.username, { color: colors.text }]} numberOfLines={1}>
            {user?.username ? `@${user.username}` : user?.full_name || 'Usuario'}
          </Text>
          {user?.username && (
            <Text style={[styles.fullName, { color: colors.textSecondary }]} numberOfLines={1}>
              {user?.full_name}
            </Text>
          )}
          {user?.bio && (
            <Text style={[styles.bio, { color: colors.text }]} numberOfLines={4}>
              {user.bio}
            </Text>
          )}
        </View>
      </View>

      {/* ─── Stats ─────────────────────────────────────────────── */}
      <Card variant="elevated" style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {user?.posts_count || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Posts
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.separator }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {user?.followers_count || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Seguidores
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.separator }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {user?.following_count || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Siguiendo
            </Text>
          </View>
        </View>
      </Card>

      {/* ─── Actions ───────────────────────────────────────────── */}
      <View style={styles.actions}>
        <Button
          title="Editar Perfil"
          onPress={() => {
            router.push('/(settings)/edit-profile');
          }}
          variant="outline"
          fullWidth
        />
      </View>

      {/* ─── Posts Placeholder ──────────────────────────────────── */}
      <View style={styles.postsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Mis Publicaciones
        </Text>
        <View style={styles.emptyPosts}>
          <Ionicons
            name="images-outline"
            size={40}
            color={colors.textTertiary}
          />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Aún no has publicado nada
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginRight: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
  },
  infoBox: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    minHeight: 100,
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  fullName: {
    fontSize: 14,
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  statsCard: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  actions: {
    marginBottom: 28,
  },
  postsSection: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyPosts: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
});
