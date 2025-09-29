import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '../contexts/ThemeContext';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import PermissionPopup from '../screens/PermissionPopup';
import RestoreBackupScreen from '../screens/RestoreBackupScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  PhoneNumber: undefined;
  OTPVerification: {
    phoneNumber: string;
    countryCode: string;
  };
  RestoreBackup: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const handleNavigateToOTP = (phoneNumber: string, countryCode: string) => {
    // This will be handled by navigation params
  };

  const handleNavigateToPermission = () => {
    setShowPermissionPopup(true);
  };

  const handlePermissionNotNow = () => {
    setShowPermissionPopup(false);
    // Navigate to Home directly
  };

  const handlePermissionContinue = async () => {
    setShowPermissionPopup(false);
    // Request permissions here
    // For now, just navigate to RestoreBackup
  };

  const handleNavigateToHome = () => {
    // This will be handled by navigation
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
          <Stack.Screen 
            name="OTPVerification" 
            component={OTPVerificationScreen}
            initialParams={{ phoneNumber: '', countryCode: '' }}
          />
          <Stack.Screen name="RestoreBackup" component={RestoreBackupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
        
        {/* Permission Popup Modal */}
        <PermissionPopup
          visible={showPermissionPopup}
          onNotNow={handlePermissionNotNow}
          onContinue={handlePermissionContinue}
        />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
