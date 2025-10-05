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
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { getWelcomeStyles } from '../styles/welcomeStyles';

const WelcomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
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
    navigation.navigate('PhoneNumber');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>
            Welcome to <Text style={{ color: !theme.isDark ? theme.colors.primary : theme.colors.text }}>TalkWave</Text>
          </Text>

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
