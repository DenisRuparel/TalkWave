import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '../contexts/ThemeContext';
import SplashScreen from '../screens/SplashScreen';
import ChatListScreen from '../screens/ChatListScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import RestoreBackupScreen from '../screens/RestoreBackupScreen';
import ProfileInfoScreen from '../screens/ProfileInfoScreen';
import FinishingSetupScreen from '../screens/FinishingSetupScreen';

export type RootStackParamList = {
  Splash: undefined;
  ChatList: undefined;
  PhoneNumber: undefined;
  OTPVerification: {
    phoneNumber: string;
    countryCode: string;
  };
  RestoreBackup: undefined;
  ProfileInfo: undefined;
  FinishingSetup: undefined;
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
          {/* Chat list is our post-setup landing */}
          <Stack.Screen name="ChatList" component={ChatListScreen} />

          {/* Auth / Setup flow with explicit navigation callbacks */}
          <Stack.Screen name="PhoneNumber">
            {({ navigation }) => (
              <PhoneNumberScreen
                onNavigateToOTP={(phoneNumber, countryCode) =>
                  navigation.navigate('OTPVerification', { phoneNumber, countryCode })
                }
                onNavigateBack={() => navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="OTPVerification" initialParams={{ phoneNumber: '', countryCode: '' }}>
            {({ navigation, route }) => (
              <OTPVerificationScreen
                phoneNumber={(route.params as any)?.phoneNumber || ''}
                countryCode={(route.params as any)?.countryCode || ''}
                onNavigateBack={() => navigation.goBack()}
                onNavigateToPermission={() => navigation.navigate('RestoreBackup')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="RestoreBackup">
            {({ navigation }) => (
              <RestoreBackupScreen onNavigateToProfile={() => navigation.navigate('ProfileInfo')} />
            )}
          </Stack.Screen>

          <Stack.Screen name="ProfileInfo">
            {({ navigation }) => (
              <ProfileInfoScreen onNext={() => navigation.navigate('FinishingSetup')} />
            )}
          </Stack.Screen>

          <Stack.Screen name="FinishingSetup">
            {({ navigation }) => (
              <FinishingSetupScreen onDone={() => navigation.replace('ChatList')} />
            )}
          </Stack.Screen>
        </Stack.Navigator>

      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
