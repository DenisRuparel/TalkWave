import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getWelcomeStyles } from '../styles/welcomeStyles';

interface WelcomeScreenProps {
  onNavigateToPhoneNumber: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigateToPhoneNumber }) => {
  const { theme } = useTheme();
  const styles = getWelcomeStyles(theme);

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://talkwave.com/privacy-policy').catch(() => {
      Alert.alert('Error', 'Could not open Privacy Policy');
    });
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://talkwave.com/terms-of-service').catch(() => {
      Alert.alert('Error', 'Could not open Terms of Service');
    });
  };

  const handleAgreeAndContinue = () => {
    onNavigateToPhoneNumber();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Welcome to TalkWave</Text>

          {/* Illustration/Logo */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../assets/illustration.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Terms Text */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Read our{' '}
              <Text style={styles.link} onPress={handlePrivacyPolicy}>
                Privacy Policy
              </Text>
              . Tap "Agree and continue" to accept the{' '}
              <Text style={styles.link} onPress={handleTermsOfService}>
                Terms of Service
              </Text>
              .
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleAgreeAndContinue}>
            <Text style={styles.buttonText}>AGREE AND CONTINUE</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>from TalkWave</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
