import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from '@react-native-vector-icons/octicons';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

interface ProfileInfoScreenProps {
  onNext: () => void;
}

const MAX_LEN = 25;

const ProfileInfoScreen: React.FC<ProfileInfoScreenProps> = ({ onNext }) => {
  const { theme } = useTheme();
  const { displayName, setDisplayName, photoUri, setPhotoUri } = useUser();
  const [name, setName] = useState<string>(displayName || '');
  const [isFocused, setIsFocused] = useState(false);
  const underlineAnim = useRef(new Animated.Value(0)).current;

  const requestPickImage = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== 'granted') return;
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (e) {
      // ignore
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(underlineAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(underlineAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  };

  const progress = underlineAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const canContinue = name.trim().length > 0;

  const handleNext = () => {
    setDisplayName(name.trim());
    onNext();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginTop: 90 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Profile info</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 8, textAlign: 'center' }}>
          Please provide your name and an optional profile photo
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center' }}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={{ width: 140, height: 140, borderRadius: 70 }} />
          ) : (
            <Icon name="person" size={64} color={theme.colors.textSecondary} />
          )}
          <TouchableOpacity
            onPress={requestPickImage}
            style={{ position: 'absolute', right: 4, bottom: 4, width: 40, height: 40, borderRadius: 20, backgroundColor: '#015ff7', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.colors.background }}
          >
            <Icon name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            value={name}
            onChangeText={(t) => setName(t.slice(0, MAX_LEN))}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Your name"
            placeholderTextColor={theme.colors.textSecondary}
            style={{ flex: 1, color: theme.colors.text, fontSize: 16, paddingVertical: 8 }}
            returnKeyType="done"
          />
          <Text style={{ color: theme.colors.textSecondary, marginLeft: 8 }}>{name.length}</Text>
        </View>
        <View style={{ height: 2, backgroundColor: theme.colors.border, overflow: 'hidden' }}>
          <Animated.View style={{ height: 2, width: progress as any, backgroundColor: '#015ff7' }} />
        </View>
      </View>

      <View style={{ marginTop: 'auto', marginBottom: 40 }}>
        <TouchableOpacity
          disabled={!canContinue}
          onPress={handleNext}
          style={{ opacity: canContinue ? 1 : 0.5, backgroundColor: '#015ff7', paddingVertical: 16, borderRadius: 28, alignItems: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileInfoScreen;


