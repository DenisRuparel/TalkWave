import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';

type Screen = 'splash' | 'welcome' | 'phoneNumber' | 'otpVerification';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [phoneData, setPhoneData] = useState<{phoneNumber: string, countryCode: string} | null>(null);

  const handleSplashComplete = () => {
    setCurrentScreen('welcome');
  };

  const handleNavigateToPhoneNumber = () => {
    setCurrentScreen('phoneNumber');
  };

  const handleNavigateToOTP = (phoneNumber: string, countryCode: string) => {
    setPhoneData({ phoneNumber, countryCode });
    setCurrentScreen('otpVerification');
  };

  const handleNavigateBackToPhone = () => {
    setCurrentScreen('phoneNumber');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onAnimationComplete={handleSplashComplete} />;
      case 'welcome':
        return <WelcomeScreen onNavigateToPhoneNumber={handleNavigateToPhoneNumber} />;
      case 'phoneNumber':
        return <PhoneNumberScreen onNavigateToOTP={handleNavigateToOTP} onNavigateBack={handleNavigateBackToPhone} />;
      case 'otpVerification':
        return phoneData ? (
          <OTPVerificationScreen 
            phoneNumber={phoneData.phoneNumber} 
            countryCode={phoneData.countryCode}
            onNavigateBack={handleNavigateBackToPhone}
          />
        ) : null;
      default:
        return <WelcomeScreen onNavigateToPhoneNumber={handleNavigateToPhoneNumber} />;
    }
  };

  return (
    <ThemeProvider>
      {renderScreen()}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
