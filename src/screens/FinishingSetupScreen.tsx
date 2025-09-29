import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface FinishingSetupScreenProps {
  onDone: () => void;
}

const FinishingSetupScreen: React.FC<FinishingSetupScreenProps> = ({ onDone }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => onDone(), 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginTop: 90 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Finishing setup</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 8, textAlign: 'center' }}>
          This will take just a moment…
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assets/illustration.png')} style={{ width: 220, height: 220, resizeMode: 'contain' }} />
      </View>

      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <ActivityIndicator size="large" color="#015ff7" />
      </View>
    </SafeAreaView>
  );
};

export default FinishingSetupScreen;


