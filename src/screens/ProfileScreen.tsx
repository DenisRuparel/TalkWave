import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileScreenProps {
  onDone?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onDone }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 24 }}>
      <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700', marginBottom: 16 }}>
        Set up your profile
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
        This is a placeholder profile screen. We will replace this with your prompt-driven UI.
      </Text>
      <View style={{ marginTop: 'auto' }}>
        <TouchableOpacity
          onPress={onDone}
          style={{ backgroundColor: '#015ff7', paddingVertical: 16, borderRadius: 8, alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;


