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
import ProfileInfoScreen from './src/screens/ProfileInfoScreen';
import FinishingSetupScreen from './src/screens/FinishingSetupScreen';
import { UserProvider } from './src/contexts/UserContext';
import ChatListScreen from './src/screens/ChatListScreen';

type Screen = 'splash' | 'welcome' | 'phoneNumber' | 'otpVerification' | 'restoreBackup' | 'profileInfo' | 'finishingSetup' | 'chatList';

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
    setCurrentScreen('chatList');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profileInfo');
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
      case 'profileInfo':
        return <ProfileInfoScreen onNext={() => setCurrentScreen('finishingSetup')} />;
      case 'finishingSetup':
        return <FinishingSetupScreen onDone={handleNavigateToHome} />;
      case 'chatList':
        return <ChatListScreen />;
      default:
        return <WelcomeScreen onNavigateToPhoneNumber={handleNavigateToPhoneNumber} />;
    }
  };

  return (
    <ThemeProvider>
      <UserProvider>
        {renderScreen()}
      </UserProvider>
      <ContactsMediaPermissionModal
        visible={showContactsMediaModal}
        onClose={() => { setShowContactsMediaModal(false); setCurrentScreen('chatList'); }}
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