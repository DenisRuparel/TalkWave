import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import ContactsMediaPermissionModal from './src/screens/ContactsMediaPermissionModal';
import RestoreBackupScreen from './src/screens/RestoreBackupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';

type Screen = 'splash' | 'welcome' | 'phoneNumber' | 'otpVerification' | 'restoreBackup' | 'profile' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [phoneData, setPhoneData] = useState<{phoneNumber: string, countryCode: string} | null>(null);
  const [showContactsMediaModal, setShowContactsMediaModal] = useState(false);

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

  const handleNavigateToPermission = () => {
    setShowContactsMediaModal(true);
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('home');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profile');
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
            onNavigateToPermission={handleNavigateToPermission}
          />
        ) : null;
      case 'restoreBackup':
        return <RestoreBackupScreen onNavigateToProfile={handleNavigateToProfile} />;
      case 'profile':
        return <ProfileScreen onDone={handleNavigateToHome} />;
      case 'home':
        return <HomeScreen onNavigateBack={handleNavigateBackToPhone} />;
      default:
        return <WelcomeScreen onNavigateToPhoneNumber={handleNavigateToPhoneNumber} />;
    }
  };

  return (
    <ThemeProvider>
      {renderScreen()}
      <ContactsMediaPermissionModal
        visible={showContactsMediaModal}
        onClose={() => { setShowContactsMediaModal(false); setCurrentScreen('home'); }}
        onContinue={() => { setShowContactsMediaModal(false); setCurrentScreen('restoreBackup'); }}
      />
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