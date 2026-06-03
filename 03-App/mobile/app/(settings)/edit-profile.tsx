import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Pressable, Image } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

import { Colors } from '../../constants/Colors';
import { Config } from '../../constants/Config';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const { colors } = useAppTheme();
  const { user, updateProfile, updateAvatar } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (imageUri) {
        await updateAvatar(imageUri);
      }
      
      await updateProfile({
        full_name: fullName.trim() || undefined,
        username: username.trim() || undefined,
        bio: bio.trim() || undefined,
        email: email.trim() || undefined,
        phone_number: phoneNumber.trim() || undefined,
      });
      
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      router.back();
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message || 'No se pudo actualizar el perfil';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const displayAvatar = imageUri || (user?.avatar_url ? (user.avatar_url.startsWith('http') ? user.avatar_url : `${Config.API_BASE_URL}${user.avatar_url}`) : null);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      
      <View style={styles.avatarContainer}>
        <Pressable onPress={pickImage} style={[styles.avatarButton, { borderColor: colors.border }]}>
          {displayAvatar ? (
            <Image source={{ uri: displayAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.surface }]}>
              <Ionicons name="person" size={40} color={colors.textSecondary} />
            </View>
          )}
          <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </Pressable>
      </View>

      <View style={styles.form}>
        <Input
          label="Nombre Completo"
          value={fullName}
          onChangeText={setFullName}
          icon="person-outline"
        />
        <Input
          label="Nombre de Usuario"
          value={username}
          onChangeText={setUsername}
          icon="at-outline"
          autoCapitalize="none"
        />
        <Input
          label="Biografía"
          value={bio}
          onChangeText={setBio}
          icon="information-circle-outline"
          multiline
          numberOfLines={3}
          containerStyle={{ height: 80 }}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          icon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          icon="call-outline"
          keyboardType="phone-pad"
        />
        <Button
          title="Guardar Cambios"
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  form: { gap: 16 },
});
