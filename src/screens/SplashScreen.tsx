import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { getSplashStyles } from '../styles/splashStyles';

const SplashScreen: React.FC<{ duration?: number }> = ({
  duration = 2000,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const styles = getSplashStyles(theme);

  useEffect(() => {
    // Navigate to Welcome screen after duration
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        translucent={false}
      />
      
      {/* Logo Container */}
      <Animatable.View 
        animation="fadeInUp" 
        duration={800}
        delay={200}
        style={styles.logoContainer}
      >
        <Animatable.Image
          animation="zoomIn"
          duration={600}
          delay={100}
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>

      {/* Text Container */}
      <Animatable.View 
        animation="fadeInUp" 
        duration={600}
        delay={600}
        style={styles.textContainer}
      >
        <Text style={styles.appName}>TalkWave</Text>
        <Text style={styles.tagline}>from TalkWave</Text>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
